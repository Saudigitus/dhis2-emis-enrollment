import React from 'react'
import style from "./MainHeader.module.css"
import { headBarData } from '../../../utils/constants/headBar/headBarData'
import HeaderItem from './HeaderItem'

export default function MainHeader(): React.ReactElement {
    return (
        <nav className={style.MainHeaderContainer}>
            {headBarData().map(haderItem => (
                <HeaderItem key={haderItem.id} id={haderItem.id} optionSetId={haderItem.optionSetId} component={haderItem.component} placeholder={haderItem.placeholder} label={haderItem.label} value={haderItem.value} />
            ))}
        </nav>
    )
}
