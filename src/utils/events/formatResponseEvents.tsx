import { Attribute } from "../../types/generated/models";
import { ProgramStageConfig } from "../../types/common/components";
import { VariablesTypes, CustomAttributeProps } from "../../types/common/components";

export function formatResponseEvents(programStageObject: ProgramStageConfig): CustomAttributeProps[] {
    if (!programStageObject) return [];

    return programStageObject.programStageDataElements.map(programStageDataElement => (
        {
            required: programStageDataElement.compulsory,
            name: programStageDataElement.dataElement.id,
            labelName: programStageDataElement.dataElement.displayName,
            valueType: programStageDataElement.dataElement?.optionSet
                ? Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"]
                : programStageDataElement.dataElement?.valueType as unknown as  CustomAttributeProps["valueType"],
            options: { optionSet: programStageDataElement.dataElement?.optionSet },
            disabled: false,
            pattern: "",
            visible: true,
            description: programStageDataElement.dataElement.displayName,
            searchable: programStageDataElement.dataElement.displayInReports,
            error: false,
            programStage: programStageObject.id,
            content: "",
            id: programStageDataElement.dataElement?.id,
            displayName: programStageDataElement.dataElement?.displayName,
            header: programStageDataElement.dataElement?.displayName,
            type: VariablesTypes.DataElement,
            assignedValue: undefined
        }
    ));
}
