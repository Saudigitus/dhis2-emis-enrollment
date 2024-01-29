import React from 'react'
import style from "./Badge.module.css"
import { BadgeProps } from '../../types/common/components'

export default function Badge({ value }: BadgeProps): React.ReactElement {

    return (
        <span className={style.BadgeContainer}>{value}</span>
    )
}
