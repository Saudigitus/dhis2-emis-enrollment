import { type ProgramConfig } from "../../../types/programConfig/ProgramConfig";
import { type CustomAttributeProps } from "../../../types/table/attributeColumns";
import { useMemo } from "react";

export function formatResponse(data: ProgramConfig): CustomAttributeProps[] {
    const headerResponse = useMemo(() => {
        //TODO: Remove this when the API is fixed and solve this bug 👇
        const originalData = ((data?.programStages?.find(programStge => programStge.id === "Ni2qsy2WJn4")) ?? {} as ProgramConfig["programStages"][0])

        return data?.programTrackedEntityAttributes?.map((item) => {
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
        }).concat(
            Object.keys(originalData).length > 0
                ? originalData?.programStageDataElements?.map((programStageDataElement) => {
                    return {
                        id: programStageDataElement.dataElement.id,
                        displayName: programStageDataElement.dataElement.displayName,
                        header: programStageDataElement.dataElement.displayName,
                        required: programStageDataElement.compulsory,
                        name: programStageDataElement.dataElement.displayName,
                        labelName: programStageDataElement.dataElement.displayName,
                        valueType: programStageDataElement.dataElement.valueType as unknown as CustomAttributeProps["valueType"],
                        options: { optionSet: programStageDataElement.dataElement.optionSet },
                        visible: programStageDataElement.displayInReports,
                        disabled: false,
                        pattern: '',
                        searchable: false,
                        error: false,
                        content: '',
                        key: programStageDataElement.dataElement.id
                    }
                }) as []
                : []
        )
    }, [data]);

    return headerResponse;
}
