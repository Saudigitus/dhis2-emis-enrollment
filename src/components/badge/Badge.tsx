import React from 'react'
import style from "./Badge.module.css"
import { type BadgeProps } from '../../types/common/components'

export default function Badge(props: BadgeProps): React.ReactElement {
    const { value } = props;
    return (
        <span className={style.BadgeContainer}>{value}</span>
    )
}
