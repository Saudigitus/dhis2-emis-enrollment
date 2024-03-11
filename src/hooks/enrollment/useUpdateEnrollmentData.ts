import { useState } from 'react'
import { useRecoilState } from "recoil"
import useUpdateTei from "../tei/useUpdateTei"
import useShowAlerts from "../commons/useShowAlert"
import { usePostEvent } from "../events/useCreateEvents"
import { TeiRefetch } from "../../schema/refecthTeiSchema"


function useUpdateEnrollmentData () {
    const { show } = useShowAlerts()
    const { updateTei } = useUpdateTei()
    const { updateEvent, data } = usePostEvent()
    const [ refetch, setRefetch] = useRecoilState(TeiRefetch)
    const [ loading, setLoading ] = useState<boolean>()

    const updateEnrollmentData = async ({dataEnrollmentData, dataEvents}: { dataEnrollmentData: any, dataEvents: any}) => {
        setLoading(true)
        await updateTei({
            data: dataEnrollmentData
        })
        
        .then(async () => {
            await updateEvent ({
                data: dataEvents
            })

            .then(() => { 
                show({ message: "Enrollment saved successfully", type: { success: true } })
                setRefetch(!refetch)
                setLoading(false)
            })
        })
        .catch(() => { 
            show({ message: "Error", type: { error: true } })
            setLoading(false)
        })
    }

    return { updateEnrollmentData, loading, data }
}

export default useUpdateEnrollmentData