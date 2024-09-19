import { useDataEngine, useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';
import { useRecoilState, useSetRecoilState } from "recoil";
import { ApiResponse } from "../../types/bulkImport/Interfaces";
import { TeiRefetch } from "../../schema/refecthTeiSchema";
import { ProgressState } from "../../schema/linearProgress";
import { useState } from 'react'

const POST_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: ({ params }: any) => params
}

export const usePostTrackedEntities = () => {
    const engine = useDataEngine()
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState<boolean>(TeiRefetch)
    const updateProgress = useSetRecoilState(ProgressState)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(undefined)

    async function create(foundEvents: any, params: any) {
        setLoading(true)
        setData(undefined)
        await engine.mutate({
            resource: "/tracker",
            type: "create",
            data: foundEvents,
            params: {
                atomicMode: "OBJECT",
                reportMode: "FULL",
                ...params
            }
        })
            .then((response: any) => {
                updateProgress({ progress: 100, buffer: 100 })
                setLoading(false)
                setData(response)
                
                show({
                    message: "Enrollment data Updated Successfully",
                    type: { success: true }
                })
                setTimeout(hide, 5000);
                setRefetch(!refetch)

                setTimeout(() => {
                    updateProgress({ progress: null, buffer: null });
                }, 200);
            })
            .catch(() => { })
    }

    // const [create, { loading, data, error }] = useDataMutation(POST_TEI, {
    //     onComplete: () => {
    //         show({ message: "Enrollments saved successfully", type: { success: true } })
    //         setRefetch(!refetch)
    //         // updateProgress({ progress: 100, buffer: 100 })
    //     },
    //     onError: (error) => {
    //         updateProgress({ progress: null })
    //         show({
    //             message: `${("Could not save the enrollments details")}: ${error.message}`,
    //             type: { critical: true }
    //         });
    //         setTimeout(hide, 5000);
    //     }
    // });

    return {
        loading,
        postTrackedEntities: create,
        data: data as unknown as ApiResponse,
    }
}
