import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert";
import { useRecoilState } from "recoil";
import { TeiRefetch } from "../../schema/refecthTeiSchema";

const UPDATE_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        importStrategy: 'CREATE_AND_UPDATE',
        async: false
    }
}

export default function useUpdateTei() {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState(TeiRefetch)

    const [create, { loading, data }] = useDataMutation(UPDATE_TEI, {
        onComplete: () => {
            show({ message: "Enrollment updated successfully", type: { success: true } })
            setRefetch(!refetch)
        },
        onError: (error) => {
            show({
                message: `Could not update the enrollment details: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    });

    return {
        loading,
        updateTei: create,
        data
    }
}
