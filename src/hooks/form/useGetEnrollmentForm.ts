import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { ProgramStageConfig } from '../../types/programStageConfig/ProgramStageConfig';

export default function useGetEnrollmentForm() {
    const [enrollmentsData, setEnrollmentsData] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()

    const buildForm = () => {
        if (Object.keys(getDataStoreData)?.length && getProgram !== undefined) {
            const { registration, 'socio-economics': { programStage } } = getDataStoreData
            const { programStages } = getProgram
            
            const enrollmentDetailProgramStage = programStages.find((element: ProgramStageConfig) => element.id === registration.programStage) as unknown as ProgramStageConfig
            const socioEconomicProgramStage = programStages.find((element: ProgramStageConfig) => element.id === programStage) as unknown as ProgramStageConfig

            setEnrollmentsData([formatResponseEvents(enrollmentDetailProgramStage), formatResponseTEI(getProgram), formatResponseEvents(socioEconomicProgramStage)])
        }
    }
    useEffect(() => {
        buildForm()
    }, [])

    return { enrollmentsData }
}
