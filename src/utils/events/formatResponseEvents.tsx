import { Attribute } from "../../types/generated/models";
import { type ProgramStageConfig } from "../../types/programStageConfig/ProgramStageConfig";
import { VariablesTypes, type CustomAttributeProps } from "../../types/table/AttributeColumns";

export function formatResponseEvents(object: ProgramStageConfig) {
    const dataElements: CustomAttributeProps[] = [];
    if (object != null) {
        for (const programStageDataElement of object?.programStageDataElements) {
            dataElements.push({
                required: programStageDataElement.compulsory,
                name: programStageDataElement.dataElement.id,
                labelName: programStageDataElement.dataElement.displayName,
                valueType: ((programStageDataElement.dataElement?.optionSet) != null) ? Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"] : programStageDataElement.dataElement?.valueType as unknown as CustomAttributeProps["valueType"],
                options: { optionSet: programStageDataElement.dataElement?.optionSet ?? undefined },
                disabled: false,
                pattern: "",
                visible: true,
                description: programStageDataElement.dataElement.displayName,
                searchable: programStageDataElement.dataElement.displayInReports,
                error: false,
                programStage: object?.id,
                content: "",
                id: programStageDataElement.dataElement?.id,
                displayName: programStageDataElement.dataElement?.displayName,
                header: programStageDataElement.dataElement?.displayName,
                type: VariablesTypes.DataElement,
                value: undefined
            });
        }
    }
    return dataElements;
}
