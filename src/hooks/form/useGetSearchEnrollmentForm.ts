import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { ProgramStageConfig } from '../../types/programStageConfig/ProgramStageConfig';
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes';

export default function useGetSearchEnrollmentForm() {
    const [searchEnrollmentFields, setSearchEnrollmentFields] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()
    const { registration } = getDataStoreData
    const { programStages } = getProgram

    const buildSearhForm = ({ attributeKey }: { attributeKey: string}) => {
        if (Object.keys(getDataStoreData)?.length && getProgram !== undefined) {
            const enrollmentDetailProgramStage = programStages.find((element: ProgramStageConfig) => element.id === registration.programStage) as unknown as ProgramStageConfig
            const formDataElements = formatResponseEvents(enrollmentDetailProgramStage).filter((element) => element.id === registration.academicYear).map((el) => { return { ...el, disabled: true}})

            const formSearchableAttributes = formatResponseTEI(getProgram).filter((element) => element[attributeKey] === true).map((el) => { return { ...el, disabled: false, required: false}})

        setSearchEnrollmentFields([formDataElements, formSearchableAttributes])
        }
    }

    return { searchEnrollmentFields, buildSearhForm }
}
