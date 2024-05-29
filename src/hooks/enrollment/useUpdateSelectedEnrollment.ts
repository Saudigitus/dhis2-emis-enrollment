import { useParams, useUpdateTei } from "../../hooks"
import { teiUpdateBody } from "../../utils/tei/formatUpdateBody"
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys"
import { formatDateToIsoString } from "../../utils/commons/formatDateToIsoString";

export function useUpdateSelectedEnrollment() {
    const { urlParamiters } = useParams();
    const { school: orgUnit } = urlParamiters()
    const { updateTei, data, loading, error } = useUpdateTei()
    const { trackedEntityType } = getDataStoreKeys();

    const updateSelectedEnrollment = async (fieldsWithValue: any, events: any, initialValues: any, values: any, program: string) => {
        const trackedEntity = initialValues['trackedEntity' as unknown as keyof typeof initialValues]
        const enrollment = initialValues['enrollment' as unknown as keyof typeof initialValues]

        return await updateTei({
            data:
                teiUpdateBody(
                    fieldsWithValue,
                    orgUnit ?? "",
                    trackedEntityType,
                    trackedEntity,
                    values,
                    formatDateToIsoString(values['eventdatestaticform']),
                    program,
                    enrollment,
                    events)
        })
    }

    return { updateSelectedEnrollment, data, loading, error }
}