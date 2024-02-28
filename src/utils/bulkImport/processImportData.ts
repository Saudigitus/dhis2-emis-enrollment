import {fromPairs} from "./validateTemplate";
import {SafeParseError, SafeParseSuccess, ZodString, ZodTypeAny} from 'zod';
import {FieldMapping, TemplateData, TemplateFieldMapping, ValueType} from "../../types/bulkImport/Interfaces";
import {ProgramConfig} from "../../types/programConfig/ProgramConfig";

/**
 * Generate an array of Record<string, any> objects using supplied headers as the keys for each field
 * @param headers - the headers to use as keys for each record
 * @param data - array of data from template
 * @return - array of Record<string, any> objects
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
const getMandatoryFields = (fieldsMap: TemplateFieldMapping): FieldMapping[] => {
    const mandatoryAttributes: FieldMapping[] = []
    Object.entries(fieldsMap).forEach(([key, value]) => {
        if (value.required && value.isTEAttribute && value.name !== "System ID") {
            mandatoryAttributes.push(value)
        }
    })
    return mandatoryAttributes
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
    record: Record<string, any>, fieldsMap: TemplateFieldMapping): {isValid: boolean, errors: Record<string, string[]>} => {
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
            }
        }
    });
    if (queryResult?.trackedEntities?.instances.length > 0) {
        return queryResult.trackedEntities.instances
    }
    return []
}
/**
 * Returns a system generated "System ID" tracked entity attribute from DHIS2
 * @param engine
 * @param systemIDAttribute
 * @returns - a promise for the System ID attribute
 */
const getTESystemID = async (engine: any, systemIDAttribute: string): Promise<string> => {
    const queryResult = await engine.query({
        trackedEntityAttribute: {
            resource: 'trackedEntityAttributes',
            id: ({ id }: { id: string }) => `${id}/generate`,
            params: {
                expiration: 3
            }
        }
    }, { variables: {id: systemIDAttribute}});
    return queryResult?.trackedEntityAttribute?.value
}

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
    for (const record of data.slice(0, 2)) {
        const {isValid, errors} = validateRecord(record, fieldsMap)
        if (!isValid) {
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
            recordsToUpdate.push(record)
        } else {
            newRecords.push(record)
            const systemIDTEAttributeID: string = getProgramTEAttributeID(programConfig, "System ID")
            const systemID = await getTESystemID(
                engine,
                systemIDTEAttributeID.length > 0
                    ? systemIDTEAttributeID
                    : "G0B8B0AH5Ek"
            )
            console.log("System ID", systemID)
        }
    }
    return [invalidRecords, validRecords, newRecords, recordsToUpdate]
}

export const createTrackedEntityPayload = (records: TemplateData[], fieldsMapping: FieldMapping) => {
    // to be implemented
}
