import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys"
import { eventUpdateBody } from "../../utils/events/formatPostBody"
import { teiUpdateBody } from "../../utils/tei/formatUpdateBody"
import { useParams } from "../commons/useQueryParams"
import { usePostEvent } from "../events/useCreateEvents"
import useUpdateTei from "../tei/useUpdateTei"

export function useUpdateSelectedEnrollment() {
    const { updateTei } = useUpdateTei()
    const { urlParamiters } = useParams();
    const { updateEvent } = usePostEvent()
    const { school: orgUnit } = urlParamiters()
    const { trackedEntityType } = getDataStoreKeys();

    const updateSelectedEnrollment = async (fieldsWithValue: any, events: any, eventDate: any,  initialValues: any, values: any, program: string) => {
        const allFields = fieldsWithValue.flat()
        const trackedEntity = initialValues['trackedEntity' as unknown as keyof typeof initialValues]

        if (allFields.filter((element: any) => (element?.assignedValue === undefined && element.required))?.length === 0) {
            const promises = [];

            for (let index = 0; index < fieldsWithValue.length; index++) {
                const element = fieldsWithValue[index];

                if (element.some((field: any) => field.assignedValue != initialValues[field.id as keyof typeof initialValues] && initialValues[field.id as keyof typeof initialValues] != "")) {

                    if (element[0].type === "dataElement") {
                        promises.push(
                            updateEvent({
                                data: eventUpdateBody(
                                    [fieldsWithValue[index]],
                                    events?.filter((event: any) => event.programStage === element[0].programStage),
                                    eventDate,
                                    values,
                                    orgUnit ?? "",
                                    program,
                                    trackedEntity
                                )
                            })
                        );
                    } else if (element[0].type === "attribute") {
                        promises.push(
                            updateTei({
                                data: teiUpdateBody(
                                    [fieldsWithValue[index]],
                                    orgUnit ?? "",
                                    trackedEntityType,
                                    trackedEntity,
                                    values
                                )
                            })
                        );
                    }
                }
            }

            return  await Promise.all(promises)
        }
    }


    return { updateSelectedEnrollment }
}