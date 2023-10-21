import React from 'react'
import style from "./MainHeader.module.css"
import { headBarData } from '../../../utils/constants/headBar/headBarData'
import HeaderItem from './HeaderItem'
import { useParams } from '../../../hooks/commons/useQueryParams'
import { getSelectedKey } from '../../../utils/commons/dataStore/getSelectedKey'

export default function MainHeader(): React.ReactElement {
    const { urlParamiters } = useParams();
    const selectedOptions = urlParamiters();
    const { getDataStoreData } = getSelectedKey()
    const registration = getDataStoreData.registration

    return (
        <nav className={style.MainHeaderContainer}>
            {headBarData(selectedOptions, registration).map(haderItem => (
                <HeaderItem key={haderItem.id} id={haderItem.id} dataElementId={haderItem.dataElementId} component={haderItem.component} placeholder={haderItem.placeholder} label={haderItem.label} value={haderItem.value} />
            ))}
        </nav>
    )
}
