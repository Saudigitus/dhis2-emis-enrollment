import {fromPairs} from "./validateTemplate";
import {SafeParseError, SafeParseSuccess, ZodString, ZodTypeAny} from 'zod';
import {FieldMapping, TemplateData, TemplateFieldMapping, ValueType} from "../../types/bulkImport/Interfaces";
import {ProgramConfig} from "../../types/programConfig/ProgramConfig";
import {Attribute, DataValue, Enrollment, ProgramEvent, TrackedEntity} from "../../schema/trackerSchema";

/**
 * Generate an array of Record<string, any> objects using supplied headers as the keys for each field
 * @param headers - the headers to use as keys for each record
 * @param data - an array of data from template
 * @return - an array of Record<string, any> objects
 */
export const generateData = (headers: string[], data: any[]): TemplateData => {
    return data.map((d) => fromPairs(
        d.map((v: any, idx: number) => [headers[idx], v]))
    )
}

const parseDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
}

/**
 * Returns an array of FieldMapping objects that are required for TE enrollment
 * @param fieldsMap - A mapping of template fields - Record<string, FieldMapping>
 * @returns An array of the fields that are required for TE enrollment
 */
export const getMandatoryFields = (fieldsMap: TemplateFieldMapping): FieldMapping[] => {
    return Object.values(fieldsMap)
        .filter((field) => field.required && field.isTEAttribute && field.name !== "System ID")
}

/**
 * Given a schema and whether a field is mandatory,
 * extend schema to ensure required field isn't optional when parsing
 * @param schema - a zod schema to use when parsing value
 * @param value value to parse
 * @param isRequired - whether value is required
 * @return output from parsing value using zod schema
 */
const parseWithOptionality = (
    schema: ZodTypeAny, value: any, isRequired: boolean): SafeParseSuccess<any> | SafeParseError<any> => {
    // Check if the schema is a string schema and required
    if (schema instanceof ZodString && isRequired) {
        schema = schema.min(1);
    } else if (!isRequired) {
        // Make schema optional
        schema = schema.optional();
    }
    return schema.safeParse(value);
}

/**
 * Checks if a record in the Excel template meets the validation as per program configuration
 * @param record - a record in the Excel template
 * @param fieldsMap - a dictionary with mappings for each field
 * @return an object indicating whether the record is valid and errors if any
 */
const validateRecord = (
    record: Record<string, any>, fieldsMap: TemplateFieldMapping): {
    isValid: boolean,
    errors: Record<string, string[]>
} => {
    const errors: Record<string, string[]> = {};
    Object.entries(record).forEach(([key, value]) => {
        // const parser = parsers[key as ParserKeys];
        const parser = ValueType[fieldsMap[key]?.valueType]
        if (parser !== undefined && key.length !== 0) {
            // const result = parser.safeParse(value);
            const result = parseWithOptionality(parser, value, fieldsMap[key].required);
            if (!result.success) {
                // Collect errors for each key
                errors[key] = result.error.issues.map(issue => issue.message);
            }
        } else {
            console.warn(`No parser defined for key: ${key}`);
        }
    });
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * getProgramTEAttributeID returns the id of a tracked entity attribute given its name
 * @param programConfig - the DHIS2 program configuration object
 * @param attribute the name of the tracked entity attribute
 * @return the id of the tracked entity attribute
 */
export const getProgramTEAttributeID = (programConfig: ProgramConfig, attribute: string): string => {
    const attr = programConfig?.programTrackedEntityAttributes.filter((v: any) => {
        return (v.trackedEntityAttribute.displayName === attribute)
    })
    if (attr?.length > 0) {
        return attr[0]?.trackedEntityAttribute?.id
    }
    return "";
}

/**
 * Checks the existence of tracked entity given some te attributes in filterParams, the program & orgUnit
 * @param engine - an instance of the DHIS2 DataEngine
 * @param programId - the student program ID
 * @param ouID - the orgUnit id for the school
 * @param filterParams - filter params for te attributes in the form UID:EQ:VALUE;UID:EQ:VALUE
 * @returns - a promise of an Array of tracked entities matching the search params
 */
const checkTEI = async (engine: any, programId: string, ouID: string, filterParams: string): Promise<any[]> => {
    const queryResult = await engine.query({
        trackedEntities: {
            resource: 'tracker/trackedEntities',
            params: {
                program: programId,
                orgUnit: ouID,
                filter: filterParams
            },
            fields: ['trackedEntity', 'attributes']
        }
    });
    if (queryResult?.trackedEntities?.instances.length > 0) {
        return queryResult.trackedEntities.instances
    }
    return []
}
/**
 * Returns a system generated "System ID" tracked entity attribute from DHIS2
 * @param engine - DHIS2 DataEngine obtained from useDataEngine()
 * @param systemIDAttribute
 * @returns - a promise for the System ID attribute
 */
const getTESystemID = async (engine: any, systemIDAttribute: string): Promise<string> => {
    const queryResult = await engine.query({
        trackedEntityAttribute: {
            resource: 'trackedEntityAttributes',
            id: ({id}: { id: string }) => `${id}/generate`,
            params: {
                expiration: 3
            }
        }
    }, {variables: {id: systemIDAttribute}});
    return queryResult?.trackedEntityAttribute?.value
}

/**
 * Processes Data from Excel template to return valid, invalid, new and records to update
 * @param data - An array of Records<string, any> for the records from Excel template
 * @param fieldsMap - A dictionary for Excel field headers and their configs
 * @param programConfig - The program configuration object
 * @param engine - The DHIS2 data engine from useDataEgine
 * @returns a Promise of an array with invalid, valid, new, and records to update
 */
export const processData = async (
    data: TemplateData,
    fieldsMap: TemplateFieldMapping,
    programConfig: ProgramConfig,
    engine: any): Promise<[TemplateData, TemplateData, TemplateData, TemplateData]> => {
    //
    const validRecords: TemplateData = []
    const invalidRecords: TemplateData = []
    const recordsToUpdate: TemplateData = []
    const newRecords: TemplateData = []
    for (const record of data) {
        const {isValid, errors} = validateRecord(record, fieldsMap)
        if (!isValid) {
            record.errors = errors
            invalidRecords.push(record)
            continue
        } else {
            validRecords.push(record)
        }
        console.log(`Record:`, record.ref, " is ", isValid, ` Errors:`, errors)
        const mandatoryAttributes = getMandatoryFields(fieldsMap)
        // console.log("Mandatory Fields", mandatoryAttributes)
        // search for existence in DHIS2 here
        const filterParams: string = mandatoryAttributes.map((a: FieldMapping) => {
            if (a.key !== undefined) {
                const value: string = (record[a.key] instanceof Date) ? parseDateString(record[a.key]) : record[a.key]
                return `${a.id}:EQ:${value}`
            }
            return "";
        }).join("&filter=")

        const instances = await checkTEI(engine, programConfig.id, record.orgUnit, filterParams)
        if (instances.length > 0) {
            record.trackedEntity = instances[0].trackedEntity
            recordsToUpdate.push(record)
        } else {
            const systemIDTEAttributeID: string = getProgramTEAttributeID(programConfig, "System ID")
            record[systemIDTEAttributeID] = await getTESystemID(
                engine,
                systemIDTEAttributeID.length > 0
                    ? systemIDTEAttributeID
                    : "G0B8B0AH5Ek"
            )
            newRecords.push(record)
        }
    }
    return [invalidRecords, validRecords, newRecords, recordsToUpdate]
}

/**
 * Given a fields mapping, returns an array of fields that are tracked entity attributes
 * @param fieldsMapping - A dictionary for Excel field headers and their configs
 * @returns a string array with tracked entity attribute UIDs
 */
const getTEAttributesFromMapping = (fieldsMapping: TemplateFieldMapping): string[] => {
    return Object.values(fieldsMapping).flatMap(field => {
        if (field.isTEAttribute) {
            return [field.key]
        } else {
            return []
        }
    })
}
/**
 * Returns a record with enrollment program stages as keys and the values as and array of DataVales
 *   - we could use lodash's groupBy too, but didn't want to extra libraries.
 * @param data - an array of arrays with data for the enrollment program stages
 * @returns a Record with enrollment program stages as keys and the values as and array of DataVales
 *
 * @example
 *  const data: any[][] = [
 *      [ 'Ni2qsy2WJn4.iDSrFrrVgmX', '2023' ],
 *      [ 'Ni2qsy2WJn4.kNNoif9gASf', 'Grade 1' ],
 *      [ 'Wi3KEZ7C3w9.xOiyqnsPZS7', 'Yes' ],
 *      [ 'Wi3KEZ7C3w9.ReiryBkZcCT', 'No' ],
 *  ]
 *  const programStagesDataValues = groupDataValuesByProgramStage(data)
 *  console.log(programStagesDataValues) // Output: {
 *      "Ni2qsy2WJn4": [{dataElement: "iDSrFrrVgmX", value: "2023"}, {dataElement: "kNNoif9gASf", value: "Grade 1"}],
 *      "Wi3KEZ7C3w9": [{dataElement: "xOiyqnsPZS7", value: "Yes"},{dataElement: "ReiryBkZcCT", value: "No"}]
 *  }
 */
export const groupDataValuesByProgramStage = (data: any[][]): Record<string, DataValue[]> => {
    return data.reduce((acc, [first, second]) => {
        // Split the first element on a . and get the zeroth part as key.
        const key = first.split('.')[0]
        // If the key doesn't exist, initialize it with an empty array
        if (!acc[key]) {
            acc[key] = []
        }
        // Push the DataValue {dataElement: "", value: ""} to the group corresponding to the key
        const dataElement = first.split('.')[1]
        const dataValue: DataValue = {
            dataElement,
            value: second
        }
        // acc[key].push([first, second])
        acc[key].push(dataValue)
        return acc;
    }, {} as Record<string, DataValue[]>)
}

/**
 * Creates an array of tracked entity payloads from the data passed.
 * It supports both new TEs and TEs for update
 * @param records - An array of records Record<string, any>
 * @param fieldsMapping - A dictionary for Excel field headers and their configs
 * @param programConfig - program configuration object
 * @param enrollmentProgramStages - a string array with uids for enrollment program
 * @param performanceProgramStages - a string array of performance program stages
 * @param forUpdate - a boolean indicating whether records are for updates to enrollments
 */
export const createTrackedEntityPayload = (
    records: TemplateData,
    fieldsMapping: TemplateFieldMapping,
    programConfig: ProgramConfig,
    enrollmentProgramStages: string[],
    performanceProgramStages: string[],
    forUpdate: boolean = false
    ): TrackedEntity[] => {
    // to be implemented

    const teAttributes = getTEAttributesFromMapping(fieldsMapping)

    const TEIs: TrackedEntity[] = []
    records.forEach((record) => {
        console.log("^^^^^^", teAttributes)
        const attributes: Attribute[] = Object.entries(record)
            .flatMap(([key, value]) => {
                if (teAttributes.includes(key)) {
                    const attr: Attribute = {attribute: key, value: value}
                    return [attr]
                } else {
                    return []
                }
            })
        // get the data for the enrollment program stages from the record
        const programStagesData = Object.entries(record).filter(r => {
            if (r[0].includes('.')) {
                const pStage = r[0].split('.')[0]
                return enrollmentProgramStages.includes(pStage)
            }
        })
        const enrollmentProgramStagesDataVales = groupDataValuesByProgramStage(programStagesData)
        const enrollmentEvents: ProgramEvent[] = Object.entries(enrollmentProgramStagesDataVales)
            .flatMap(([programStage, dataValues]) => {
                 const event: ProgramEvent = {
                     programStage,
                     orgUnit: record.orgUnit,
                     occurredAt: record.enrollmentDate,
                     dataValues
                 }
                 return [event]

            })

        const programEvents: ProgramEvent[] = []
        performanceProgramStages.forEach(programStage => {
            let ev: ProgramEvent = {
                programStage: programStage,
                orgUnit: record.orgUnit,
                occurredAt: record.enrollmentDate
            }
            ev = forUpdate && record?.trackedEntity.length > 0
                ? {...ev,trackedEntity: record.trackedEntity} : ev
            programEvents.push(ev)
        })
        const events = [...enrollmentEvents, ...programEvents]
        let enrollment: Enrollment = {
            program: programConfig.id,
            orgUnit: record.orgUnit,
            occurredAt: record.enrollmentDate,
            enrolledAt: record.enrollmentDate,
            status: "ACTIVE",
            events
        }
        enrollment = forUpdate && record?.trackedEntity.length > 0
            ? {...enrollment, trackedEntity: record.trackedEntity} : enrollment
        let tei: TrackedEntity = {
            orgUnit: record.orgUnit,
            attributes,
            enrollments: [enrollment],
            trackedEntityType: programConfig.trackedEntityType.id,
        }
        tei = forUpdate && record?.trackedEntity.length > 0
            ? {...tei, trackedEntity: record.trackedEntity} : tei

        TEIs.push(tei);
    })
    return TEIs
}
