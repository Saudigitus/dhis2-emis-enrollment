import { useParams, useDeleteEvent, useDeleteEnrollment, useGetTotalEnrollments, useDeleteTEI } from "../../hooks";


export function useDeleteSelectedEnrollment() {
    const { urlParamiters } = useParams();
    const { school } = urlParamiters()
    const { deleteEvent } = useDeleteEvent()
    const { deleteEnrollment } = useDeleteEnrollment()
    const { getTotalEnrollment } = useGetTotalEnrollments()
    const { deleteTEI } = useDeleteTEI()

    const deleteSelectedEnrollment = async (initialValues: any, program: string) => {
        const promises = [];
        for (let index = 0; index < initialValues.eventsId.length; index++) {
            promises.push(deleteEvent(initialValues.eventsId[index]));
        }
        promises.push(deleteEnrollment(initialValues.enrollment))

        await getTotalEnrollment(program, school as unknown as string, initialValues.trackedEntity)
            .then((resp: any) => {
                if (resp?.results?.instances?.length < 1) {
                    promises.push(deleteTEI(initialValues.trackedEntity))
                }
            })

        return await Promise.all(promises)
           
    }


    return { deleteSelectedEnrollment }
}