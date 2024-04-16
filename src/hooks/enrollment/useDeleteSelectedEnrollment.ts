import { useParams, useDeleteEnrollment, useGetTotalEnrollments, useDeleteTEI } from "../../hooks";


export function useDeleteSelectedEnrollment() {
    const { urlParamiters } = useParams();
    const { school } = urlParamiters()
    const { deleteTEI } = useDeleteTEI()
    const { deleteEnrollment } = useDeleteEnrollment()
    const { getTotalEnrollment } = useGetTotalEnrollments()

    const deleteSelectedEnrollment = async (initialValues: any, program: string) => {
        const promises = [];
        
        promises.push(deleteEnrollment(initialValues.enrollment))

        await getTotalEnrollment(program, school as unknown as string, initialValues.trackedEntity)
            .then((resp: any) => {
                if (resp?.results?.instances?.length <= 1) {
                    promises.push(deleteTEI(initialValues.trackedEntity))
                }
            })

        return await Promise.all(promises)
           
    }


    return { deleteSelectedEnrollment }
}