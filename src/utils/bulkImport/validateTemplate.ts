import {ProgramConfig} from "../../types/programConfig/ProgramConfig";
import {FieldMapping} from "../../types/bulkImport/Interfaces";

/**
 * Transforms an array of key-value pairs into an object.
 * @param pairs - An array of key-value pairs where the key is a string and the value is of generic type T.
 * @returns An object composed of key-value pairs.
 * .
 * .
 * @example
 *  const entries: [string, any][] = [['a', 1], ['b', 2], ['c', 3]];
 *  const obj = fromPairs(entries);
 *  console.log(obj); // Output: { a: 1, b: 2, c: 3 }
 *  .
 *  * @template T - The type of the values in the key-value pairs, allowing for any data type
 */
export const fromPairs = <T>(pairs: Array<[string, T]>): Record<string, T> => {
    return pairs.reduce<Record<string, T>>((accumulator, [key, value]) => {
        accumulator[key] = value;
        return accumulator;
    }, {});
}
/**
 * Get TEI attribute IDs from headers template
 * @param headers
 * @returns A string array of TEI attribute UIDs in headers
 */
const teiAttributesInTemplate = (headers: string[]): string[] => {
    const regex = /^[A-Za-z][0-9A-Za-z]{10}$/;
    return headers.filter(h => (regex.test(h) && !["orgUnitName"].includes(h)))
}
/**
 * Get programStages in Excel Template
 * @param headers An array of headers in data, possibly programStage.dataElement
 * @returns A string array with programStages in Template
 */
const programStagesInTemplate = (headers: string[]): string[] => {
    return Array.from(
        new Set(
            Object.values(headers)
                .filter((h) => h.includes('.'))
                .map((i) => i.split('.')[0])
        )
    )
}

/**
 * Get key-value object of enrollment program stages (keys), with a list of
 *  their dataElements (values) as read from the template
 *  @param headers - An array of column headers in the mapping row in template
 *  @returns key-value object with program stages as keys and dataElements as values
 */
const programStageDataElementsAsInTemplate = (headers: string[]): Record<string, string[]> => {
    const stages: string[] = programStagesInTemplate(headers)
    const stagesDataElements: string[] = Object.values(headers)
        .filter((h) => h.includes('.'));
    const DEs = stages.map(s => stagesDataElements
        .filter(r => r.startsWith(s))).map(x => x.map(y => y.split('.')[1]))
    return fromPairs(DEs.map((d, i) => [stages[i], d]))
}

/**
 * Get key-value object of enrollment program stages (keys), with a list of
 *  their dataElements (values) as read from the DHIS2 system Student program
 *  @param programConfig - The programConfig state variable
 *  @param enrollmentProgramStages - A string array for enrollment program stages
 *  @returns key-value object with program stages as keys and dataElements as values
 */
const programStageDataElementsAsInSystem = (
    programConfig: ProgramConfig, enrollmentProgramStages: string[]): Record<string, string[]> => {
    // Get DataElements for each enrollment program stage
    const des = programConfig.programStages
        .filter(s => enrollmentProgramStages.includes(s.id))
        .map(s => s.programStageDataElements.map(x => x.dataElement.id))
    // form key-value object of Program stage and DataElements
    return fromPairs(des.map((d, i) => [enrollmentProgramStages[i], d]))
}
/**
 * Validates an Excel Template used for bulk upload
 * @param data An array with data in the data sheet
 * @param metaData A array with data in metadata sheet
 * @param programConfig the state variable with program configuration
 * @param enrollmentProgramStages
 * @returns An error message if validation fails, an empty string if is all good!
 */
export const validateTemplate = (
    data: any[], metaData: any[], programConfig: ProgramConfig,
    enrollmentProgramStages: string[]): string => {
    // complain if metadata sheet is empty
    if (metaData.length === 0) {
        return "Invalid Import File: No metadata"
    }
    // programID in template should match that in DHIS2
    const {programId} = metaData[0]
    if (programId !== programConfig?.id) {
        return `Unknown program [${programId.toString() as string}] in the Metadata sheet`
    }
    // complain if data sheet is empty
    if (data.length < 2) {
        return `No enrollments in file!`
    }
    const headers: string[] = data[1]

    // look for any invalid tracked entity attributes in template
    const programTEIAttributes: string[] = programConfig
        .programTrackedEntityAttributes
        .map(t => t.trackedEntityAttribute.id);
    const templateTEIAttributes = teiAttributesInTemplate(headers)
    const invalidTEIAttributes = templateTEIAttributes.filter(t => !programTEIAttributes.includes(t))
    if (invalidTEIAttributes.length > 0) {
        const attr: string = invalidTEIAttributes.join(", ")
        return `Unknown Student attributes in template [${attr}]`
    }
    // look for any invalid program stages in template
    const stagesInTemplate: string[] = programStagesInTemplate(headers)
    const invalidStages = stagesInTemplate.filter(s => !enrollmentProgramStages.includes(s))
    if (invalidStages.length > 0) {
        const stages: string = invalidStages.join(", ")
        return `Unknown program stages in Template [${stages}]`
    }
    // look for any invalid program stage.dataElement pairs in template - bare with the complexity
    const templateProgramStageDEs: Record<string, string[]> = programStageDataElementsAsInTemplate(headers);
    const systemProgramStageDEs: Record<string, string[]> = programStageDataElementsAsInSystem(programConfig, enrollmentProgramStages);
    const invalidProgramStageDEs: string[] = []
    Object.entries(templateProgramStageDEs).forEach(([key, values]) => {
        // compare each data element with those in system for each program stage
        values.forEach((v) => {
            if (!systemProgramStageDEs[key].includes(v)) {
                invalidProgramStageDEs.push(`${key}.${v}`)
            }
        })
    })
    console.log(systemProgramStageDEs)
    if (invalidProgramStageDEs.length > 0) {
        const invalidDEs = invalidProgramStageDEs.join(", ")
        return `Unknown ProgramStage.DataElement pairs in Template [${invalidDEs}]`
    }
    return ""
}

/**
 * Generated a mapping for the field headers as in the template with their corresponding attributes as defined in
 * the DHIS2 program configuration.
 * @param programConfig - the program configuration
 * @param enrollmentProgramStages - the stages marked for student enrollment
 * @returns - the generated mapping for the field headers
 */
export const fieldsMap = (programConfig: ProgramConfig, enrollmentProgramStages: string[]): Record<string, FieldMapping> => {
    const stagesFieldsMapping = programConfig.programStages
        .filter(stage => enrollmentProgramStages.includes(stage.id))
        .map(p => {
            return p.programStageDataElements.map(de => {
                const mapping: FieldMapping = {
                    key: `${p.id}.${de.dataElement.id}`,
                    id: de.dataElement.id,
                    name: de.dataElement.displayName,
                    required: de.compulsory,
                    valueType: de.dataElement.valueType,
                    isTEAttribute: false
                }
                return mapping
            })
        })
    const fieldsMapping = stagesFieldsMapping
        .map(y => fromPairs(y.map(x => [x.key, x])))
        .reduce((accumulator, currentObj) => {
            return {...accumulator, ...currentObj}
        })
    // Let's add a mapping for the program Tracked entity attributes
    const _teiMap = programConfig.programTrackedEntityAttributes.map(te => {
        console.log()
        const mapping: FieldMapping = {
            key: `${te.trackedEntityAttribute.id}`,
            id: `${te.trackedEntityAttribute.id}`,
            name: te.trackedEntityAttribute.displayName,
            required: te.mandatory,
            valueType: te.trackedEntityAttribute.valueType,
            isTEAttribute: true
        }
        return mapping
    })
    const teiMap = [_teiMap].map(y => fromPairs(y.map(x => [x.key, x])))
        .reduce((accumulator, currentObj) => {
            return {...accumulator, ...currentObj}
        })

    // Manually add ref, enrollmentDate & orgUnit & orgUnitName
    const extraMap: Record<string, FieldMapping> = {
        ref: {key: "ref", id: "ref", name: "ref", required: false, valueType: "TEXT", isTEAttribute: false},
        orgUnitName: {key: "orgUnitName", id: "orgUnitName", name: "orgUnitName", required: true, valueType: "TEXT", isTEAttribute: false},
        orgUnit: {key: "orgUnit", id: "orgUnit", name: "orgUnit", required: true, valueType: "ORGANISATION_UNIT", isTEAttribute: false},
        enrollmentDate: {
            key: "enrollmentDate",
            id: "enrollmentDate",
            name: "enrollmentDate",
            required: true,
            valueType: "DATE",
            isTEAttribute: false
        }
    }
    return {...fieldsMapping, ...extraMap, ...teiMap}
}
