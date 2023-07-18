import React from 'react'
import style from "./SideBar.module.css"
import { type SideBarItemTitleProps } from '../../../types/sideBar/SideBarTypes'

export default function SideBarItemTitle({ title }: SideBarItemTitleProps): React.ReactElement {
  return (
    <span className={style.SideBarItemTitle}>{title}</span>
  )
}
