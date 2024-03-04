import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';
import { atom, useRecoilState } from "recoil";
import {ApiResponse} from "../../types/bulkImport/Interfaces";

const POST_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: ({params}: any) => params
}

export const teiRefetch = atom({
    key: "refetch-tei",
    default: false
})

export const usePostTrackedEntities = () => {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState<boolean>(teiRefetch)

    const [create, { loading, data }] = useDataMutation(POST_TEI, {
        onComplete: () => {
            // console.log("", data)
            show({ message: "Enrollment saved successfully", type: { success: true } })
            setRefetch(!refetch)
        },
        onError: (error) => {
            show({
                message: `Could not save the enrollment details: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    });

    return {
        loading,
        postTrackedEntities: create,
        data: data as unknown as ApiResponse
    }
}
