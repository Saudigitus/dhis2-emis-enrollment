import React, { useEffect } from 'react'
import style from "./MainHeader.module.css"
import { headBarData } from '../../../utils/constants/headBar/headBarData'
import HeaderItem from './HeaderItem'
import { getSelectedKey } from '../../../utils/commons/dataStore/getSelectedKey'
import { useParams } from '../../../hooks'
import { ProgramConfig } from '../../../types/programConfig/ProgramConfig'
import { programStageDataElements } from '../../../types/programStageConfig/ProgramStageConfig'
import { ProgramConfigState } from '../../../schema/programSchema'
import { useRecoilValue } from 'recoil'
import { initializeRulesEngine } from '../../../hooks/programRules/rules-engine/InitializeRulesEngine'

export default function MainHeader(): React.ReactElement {
    const { urlParamiters } = useParams();
    const { getDataStoreData } = getSelectedKey();
    const selectedOptions = urlParamiters();
    const programConfig: ProgramConfig = useRecoilValue(ProgramConfigState)
    const programStageDataElements: programStageDataElements[] | any = programConfig?.programStages?.find((programStage: any) => programStage.id === getDataStoreData.registration.programStage)?.programStageDataElements
    const { initialize } = initializeRulesEngine()

    useEffect(() => {
        initialize()
    }, [])

    return (
        <nav className={style.MainHeaderContainer}>
            {headBarData(selectedOptions, getDataStoreData, programStageDataElements).map(headerItem => (
                <HeaderItem disabled={headerItem.disabled} key={headerItem.id} id={headerItem.id} dataElementId={headerItem.dataElementId} component={headerItem.component} placeholder={headerItem.placeholder} label={headerItem.label} value={headerItem.value} selected={headerItem.selected} />
            ))}
        </nav>
    )
}
