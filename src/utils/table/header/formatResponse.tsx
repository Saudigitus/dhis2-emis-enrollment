import { type ProgramConfig } from "../../../types/programConfig/ProgramConfig";
import { type CustomAttributeProps } from "../../../types/table/attributeColumns";
import { useMemo } from "react";

export function formatResponse(data: ProgramConfig): CustomAttributeProps[] {
    const headerResponse = useMemo(() => {
        return data?.programTrackedEntityAttributes.map((item) => {
            return {
                id: item.trackedEntityAttribute.id,
                displayName: item.trackedEntityAttribute.displayName,
                header: item.trackedEntityAttribute.displayName,
                required: item.mandatory,
                name: item.trackedEntityAttribute.displayName,
                labelName: item.trackedEntityAttribute.displayName,
                valueType: item.trackedEntityAttribute.valueType as unknown as CustomAttributeProps["valueType"],
                options: { optionSet: item.trackedEntityAttribute.optionSet },
                visible: item.displayInList,
                disabled: false,
                pattern: '',
                searchable: false,
                error: false,
                content: '',
                key: item.trackedEntityAttribute.id
            }
        })
    }, [data]);

    return headerResponse;
}
