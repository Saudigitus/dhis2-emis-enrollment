import React from 'react';
import style from "./SideBar.module.css"
import Badge from '../../badge/Badge';
import { type SideBarSubItemProps } from '../../../types/sideBar/SideBarTypes';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SideBarSubItem({ icon, label, showBadge, route }: SideBarSubItemProps) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    return (
        <li className={pathname === route ? style.SideBarSubItemContainerActive : style.SideBarSubItemContainer} onClick={() => { navigate(route); }}>
            <img src={icon} /> <span className={style.SideBarSubItemLabel}>{label}</span>
            {showBadge ? <div className={style.BadgeContainer}><Badge value='10' /></div> : null}
            <div className={style.TooltipContainer}>
                {label}
            </div>
        </li>
    )
}
