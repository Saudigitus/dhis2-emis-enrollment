import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { ProgramStageConfig } from '../../types/programStageConfig/ProgramStageConfig';

export default function useGetExportTemplateForm() {
    const [exportFormFields, setExportFormFields] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()

    const buildForm = () => {
        if (Object.keys(getDataStoreData)?.length && getProgram !== undefined) {
            const { registration } = getDataStoreData
            const { programStages } = getProgram
            
            const enrollmentDetailProgramStage = programStages.find((element: ProgramStageConfig) => element.id === registration.programStage) as unknown as ProgramStageConfig
            const formDataElements = formatResponseEvents(enrollmentDetailProgramStage).filter((element) => element.id === registration.academicYear).map((el) => { return { ...el, disabled: true}})
            setExportFormFields([formDataElements])
        }
    }
    useEffect(() => {
        buildForm()
    }, [])

    return { exportFormFields }
}
