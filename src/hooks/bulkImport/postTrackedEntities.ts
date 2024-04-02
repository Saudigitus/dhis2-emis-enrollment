import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';
import { useRecoilState } from "recoil";
import { ApiResponse } from "../../types/bulkImport/Interfaces";
import { teiRefetch } from "../../schema/bulkImportSchema";

const POST_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: ({ params }: any) => params
}

export const usePostTrackedEntities = () => {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState<boolean>(teiRefetch)

    const [create, { loading, data, error }] = useDataMutation(POST_TEI, {
        onComplete: () => {
            show({ message: "Enrollments saved successfully", type: { success: true } })
            setRefetch(!refetch)
        },
        onError: (error) => {
            show({
                message: `${("Could not save the enrollments details")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    });

    return {
        loading,
        postTrackedEntities: create,
        data: data as unknown as ApiResponse,
        error
    }
}
