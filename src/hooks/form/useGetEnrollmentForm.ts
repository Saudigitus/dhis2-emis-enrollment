import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { DataStoreState } from '../../schema/dataStoreSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes';

export default function useGetEnrollmentForm() {
    const [enrollmentsData, setEnrollmentsData] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const getDataStoreData = useRecoilValue(DataStoreState);

    const buildForm = () => {
        if (getDataStoreData != null && getProgram !== undefined) {
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
