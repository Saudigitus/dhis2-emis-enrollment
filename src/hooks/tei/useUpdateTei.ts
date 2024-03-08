import { useRecoilState } from "recoil";
import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';
import { TeiRefetch } from "../../schema/refecthTeiSchema";

const POST_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        async: false
    }
}

export default function usePostTei() {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState(TeiRefetch)

    const [create, { loading, data }] = useDataMutation(POST_TEI, {
        onComplete: () => {
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
        postTei: create,
        data
    }
}
