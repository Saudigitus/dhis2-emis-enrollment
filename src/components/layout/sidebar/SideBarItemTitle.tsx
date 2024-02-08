import React from 'react'
import style from "./SideBar.module.css"
import { SideBarItemTitleProps } from '../../../types/sideBar/SideBarTypes';

export default function SideBarItemTitle(props: SideBarItemTitleProps): React.ReactElement {
  const { title } = props;
  return (
    <span className={style.SideBarItemTitle}>{title}</span>
  )
}
