import React from 'react'
import classNames from 'classnames';
import style from "./SideBar.module.css"
import { SideBarItemTitleProps } from '../../../types/sideBar/SideBarTypes';

export default function SideBarItemTitle(props: SideBarItemTitleProps): React.ReactElement {
  const { title } = props;
  return (
    <span className={classNames(style.SideBarItemTitle, title==="Home" ? style.SideBarHomeTitle : "")}>{title}</span>
  )
}
