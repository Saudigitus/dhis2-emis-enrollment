import React from 'react'
import style from "./MainHeader.module.css"
import { headBarData } from '../../../utils/constants/headBar/headBarData'
import HeaderItem from './HeaderItem'
import { getSelectedKey } from '../../../utils/commons/dataStore/getSelectedKey'
import { useParams } from '../../../hooks'

export default function MainHeader(): React.ReactElement {
    const { urlParamiters } = useParams();
    const { getDataStoreData } = getSelectedKey();
    const selectedOptions = urlParamiters();

    return (
        <nav className={style.MainHeaderContainer}>
            {headBarData(selectedOptions, getDataStoreData).map(headerItem => (
                <HeaderItem key={headerItem.id} id={headerItem.id} dataElementId={headerItem.dataElementId} component={headerItem.component} placeholder={headerItem.placeholder} label={headerItem.label} value={headerItem.value} selected={headerItem.selected}/>
            ))}
        </nav>
    )
}
