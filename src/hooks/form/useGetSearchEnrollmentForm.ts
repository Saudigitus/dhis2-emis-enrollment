import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { ProgramStageConfig } from '../../types/programStageConfig/ProgramStageConfig';
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes';

export default function useGetSearchEnrollmentForm() {
    const [searchEnrollmentFields, setSearchEnrollmentFields] = useState<any[]>([])
    const [isSearchable, setIsSearchable] = useState<boolean>(false)
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()
    const { registration } = getDataStoreData
    const { programStages } = getProgram

    const buildSearhForm = ({ attributeKey, position }: { attributeKey: string, position: number}) => {
        if (Object.keys(getDataStoreData)?.length && getProgram !== undefined) {
            const enrollmentDetailProgramStage = programStages.find((element: ProgramStageConfig) => element.id === registration.programStage) as unknown as ProgramStageConfig
            const formDataElements = formatResponseEvents(enrollmentDetailProgramStage).filter((element) => element.id === registration.academicYear).map((el) => { return { ...el, disabled: true}})

            const formSearchableAttributes = formatResponseTEI(getProgram).filter((element) => element[attributeKey] === true).map((el) => { return { ...el, disabled: false, required: false}})

            console.log("position", position)
            console.log("getRelative", getRelativeAttributes(attributeKey, position, formSearchableAttributes))
            setSearchEnrollmentFields([formDataElements, getRelativeAttributes(attributeKey, position, formSearchableAttributes)])
        }
    }

    const getRelativeAttributes = (attributeKey: string, position: number, attributes: any[]) => {
        if(position === attributes.length - 1) setIsSearchable(true)
        
        if(attributeKey === "unique" && position < attributes.length) {
            return [attributes[position]]
        } else if (attributeKey === "searchable") {
            return attributes
        }

    return attributes
    
}

    return { searchEnrollmentFields, buildSearhForm, isSearchable }
}
