import {fromPairs} from "./validateTemplate";
import {SafeParseError, SafeParseSuccess, ZodString, ZodTypeAny} from 'zod';
import {FieldMapping, TemplateData, TemplateFieldMapping, ValueType} from "../../types/bulkImport/Interfaces";
import {ProgramConfig} from "../../types/programConfig/ProgramConfig";

export const generateData = (headers: string[], data: any[]): TemplateData => {
    return data.map((d) => fromPairs(
        d.map((v: any, idx: number) => [headers[idx], v]))
    )
}

const parseDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
}
const getMandatoryFields = (fieldsMap: TemplateFieldMapping): FieldMapping[] => {
    const mandatoryAttributes: FieldMapping[] = []
    Object.entries(fieldsMap).forEach(([key, value]) => {
        if (value.required && value.isTEAttribute && value.name !== "System ID") {
            mandatoryAttributes.push(value)
        }
    })
    return mandatoryAttributes
}

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

export const getProgramTEAttributeID = (programConfig: ProgramConfig, attribute: string): string => {
    const attr = programConfig?.programTrackedEntityAttributes.filter((v: any) => {
        return (v.trackedEntityAttribute.displayName === attribute)
    })
    if (attr?.length > 0) {
        return attr[0]?.trackedEntityAttribute?.id
    }
    return "";
}

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
