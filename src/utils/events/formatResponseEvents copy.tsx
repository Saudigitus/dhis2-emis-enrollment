import { Attribute } from "../../types/generated/models";
import { ProgramStageConfig } from "../../types/programStageConfig/ProgramStageConfig";
import { CustomAttributeProps, VariablesTypes } from "../../types/variables/AttributeColumns";

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
                assignedValue: undefined
            });
        }
    }
    return dataElements;
}
