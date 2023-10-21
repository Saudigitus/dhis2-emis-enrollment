import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';

export default function useGetEnrollmentForm() {
    const [enrollmentsData, setEnrollmentsData] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()

    const buildForm = () => {
        if (Object.keys(getDataStoreData)?.length !== 0 && getProgram !== undefined) {
            const { registration, 'socio-economics': { programStage } } = getDataStoreData
            const { programStages } = getProgram
            const enrollmentDetailProgramStage = programStages.filter(elemnt => elemnt.id === registration.programStage)[0]
            const socioEconomicProgramStage = programStages.filter(elemnt => elemnt.id === programStage)[0]
            setEnrollmentsData([formatResponseEvents(enrollmentDetailProgramStage), formatResponseTEI(getProgram), formatResponseEvents(socioEconomicProgramStage)])
        }
    }
    useEffect(() => {
        buildForm()
    }, [])

    return { enrollmentsData }
}
