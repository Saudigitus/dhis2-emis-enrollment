import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';
import { atom, useRecoilState } from "recoil";

const POST_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        async: false
    }
}

export const teiRefetch = atom({
    key: "refetch-tei",
    default: false
})

export default function usePostTei() {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState<boolean>(teiRefetch)

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
