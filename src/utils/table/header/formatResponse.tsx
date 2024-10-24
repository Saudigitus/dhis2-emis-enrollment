import { Attribute } from "../../../types/generated/models";
import { useMemo } from "react";
import { ProgramConfig } from "../../../types/programConfig/ProgramConfig";
import { dataStoreRecord } from "../../../types/dataStore/DataStoreConfig";
import { CustomAttributeProps, VariablesTypes } from "../../../types/variables/AttributeColumns";
import { any } from "zod";

export function formatResponse(data: ProgramConfig, dataStoreData: dataStoreRecord, tableColumns: CustomAttributeProps[] = [], viewPortWidth: number): CustomAttributeProps[] {
    let columns = ['Actions']

    const headerResponse = useMemo(() => {
        const originalData = ((data?.programStages?.find(programStge => programStge.id === dataStoreData?.registration?.programStage)) ?? {} as ProgramConfig["programStages"][0])

        return tableColumns?.length > 0 ? tableColumns : data?.programTrackedEntityAttributes?.map((item) => {
            return {
                id: item.trackedEntityAttribute.id,
                displayName: item.trackedEntityAttribute.displayName,
                header: item.trackedEntityAttribute.displayName,
                required: item.mandatory,
                name: item.trackedEntityAttribute.displayName,
                labelName: item.trackedEntityAttribute.displayName,
                valueType: item.trackedEntityAttribute.optionSet?.options?.length > 0 ? Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"] : item.trackedEntityAttribute.valueType as unknown as CustomAttributeProps["valueType"],
                initialOptions: { optionSet: item.trackedEntityAttribute.optionSet },
                options: { optionSet: item.trackedEntityAttribute.optionSet },
                visible: item.displayInList,
                disabled: false,
                pattern: '',
                searchable: false,
                error: false,
                content: '',
                key: item.trackedEntityAttribute.id,
                unique: item.trackedEntityAttribute.unique,
                displayInFilters: true,
                type: VariablesTypes.Attribute
            }
        }).concat(
            Object.keys(originalData)?.length > 0
                ? originalData?.programStageDataElements?.map((programStageDataElement) => {
                    return {
                        id: programStageDataElement.dataElement.id,
                        displayName: programStageDataElement.dataElement.displayName,
                        header: programStageDataElement.dataElement.displayName,
                        required: programStageDataElement.compulsory,
                        name: programStageDataElement.dataElement.displayName,
                        labelName: programStageDataElement.dataElement.displayName,
                        valueType: programStageDataElement.dataElement.optionSet?.options?.length > 0 ? Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"] : programStageDataElement.dataElement.valueType as unknown as CustomAttributeProps["valueType"],
                        options: { optionSet: programStageDataElement.dataElement.optionSet },
                        initialOptions: { optionSet: programStageDataElement.dataElement.optionSet },
                        visible: viewPortWidth < 719 ? false : programStageDataElement.displayInReports,
                        disabled: false,
                        pattern: '',
                        searchable: false,
                        error: false,
                        content: '',
                        key: programStageDataElement.dataElement.id,
                        displayInFilters: false,
                        type: VariablesTypes.DataElement
                    }
                }) as []
                : []
        ).concat(
            columns?.map((column) => {
                return {
                    id: column,
                    displayName: column,
                    header: column,
                    required: false,
                    name: column,
                    labelName: column,
                    valueType: any,
                    options: undefined,
                    initialOptions: undefined,
                    visible: true,
                    disabled: false,
                    pattern: '',
                    searchable: false,
                    error: false,
                    content: '',
                    key: '',
                    displayInFilters: false,
                    type: VariablesTypes.Custom
                }
            }) as []
        ) || []
    }, [data, tableColumns, viewPortWidth]);

    return headerResponse;
}
