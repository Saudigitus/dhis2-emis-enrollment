import React from 'react'
import style from "./SideBar.module.css"
import { SideBarItemTitleProps } from '../../../types/common/components'

export default function SideBarItemTitle({ title }: SideBarItemTitleProps): React.ReactElement {
  return (
    <span className={style.SideBarItemTitle}>{title}</span>
  )
}
