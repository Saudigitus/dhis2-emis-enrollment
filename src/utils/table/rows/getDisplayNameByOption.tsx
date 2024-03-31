import { defaultProps } from "../../../types/utils/FormatRowsDataProps";

export function getDisplayName({ metaData, value, program }: defaultProps): string {
    console.log(metaData,"metaData")
    const dataElementsWithOptions = program?.programStages?.flatMap(stage => stage?.programStageDataElements?.map(dataElement => dataElement?.dataElement?.optionSet ? dataElement.dataElement : null))?.filter(Boolean);
    const attributesWithOptions = program?.programTrackedEntityAttributes?.flatMap(programAttributes => programAttributes?.trackedEntityAttribute?.optionSet ? programAttributes.trackedEntityAttribute : null)?.filter(Boolean)

    var metaDataOptionSet: any = attributesWithOptions?.filter(x => x?.id === metaData)[0]?.optionSet
    if (metaDataOptionSet === undefined) {
        metaDataOptionSet = dataElementsWithOptions?.filter(x => x?.id === metaData)[0]?.optionSet
    }

    if (metaDataOptionSet) {
                for (const op of metaDataOptionSet?.options || []) {
                    if (op?.value === value) return op?.label
                }
    }
    return value
}
