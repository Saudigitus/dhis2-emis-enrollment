import { Attribute } from "../../types/generated/models";
import { ProgramConfig } from "../../types/common/components";
import { VariablesTypes, CustomAttributeProps } from "../../types/common/components";

export function formatResponseTEI(attributes: ProgramConfig): CustomAttributeProps[] {
    if (!attributes) return [];

    return attributes.programTrackedEntityAttributes.map(trackedEntityAttribute => (
        {
            required: trackedEntityAttribute?.mandatory,
            name: trackedEntityAttribute?.trackedEntityAttribute?.id,
            labelName: trackedEntityAttribute?.trackedEntityAttribute?.displayName,
            valueType: trackedEntityAttribute?.trackedEntityAttribute?.optionSet
                ? Attribute.valueType.LIST as unknown as  CustomAttributeProps["valueType"]
                : trackedEntityAttribute?.trackedEntityAttribute?.valueType as unknown as  CustomAttributeProps["valueType"],
            options: { optionSet: trackedEntityAttribute?.trackedEntityAttribute?.optionSet },
            visible: true,
            disabled: trackedEntityAttribute?.trackedEntityAttribute?.generated,
            pattern: trackedEntityAttribute?.trackedEntityAttribute?.pattern,
            searchable: trackedEntityAttribute?.searchable,
            error: false,
            content: "",
            id: trackedEntityAttribute?.trackedEntityAttribute?.id,
            displayName: trackedEntityAttribute?.trackedEntityAttribute?.displayName,
            header: trackedEntityAttribute?.trackedEntityAttribute?.displayName,
            type: VariablesTypes.Attribute,
            programStage: "",
            assignedValue: undefined
        }
    ));
}
