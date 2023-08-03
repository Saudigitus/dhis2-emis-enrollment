import { useDataQuery } from '@dhis2/app-runtime'
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes'

const PROGRAM_ATTRIBUTES_QUERY = (id: string) => ({
    result: {
        resource: "programs",
        id,
        params: {
    fields: "programTrackedEntityAttributes[displayInList,mandatory,trackedEntityAttribute[id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]"
        }
    }
})

function useGetAttributes({ programId }: { programId: string }) {
    const { data, loading, error } = useDataQuery<{ result: any }>(PROGRAM_ATTRIBUTES_QUERY(programId))

    return {
        attributes: formatResponseTEI(data?.result),
        error,
        loading
    }
}
export { useGetAttributes }
