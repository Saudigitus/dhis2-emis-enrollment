import React from 'react';
import style from "./SideBar.module.css"
import Badge from '../../badge/Badge';
import { type SideBarSubItemProps } from '../../../types/sideBar/SideBarTypes';
import { useNavigate } from 'react-router-dom';

export default function SideBarSubItem({ icon, label, showBadge, route }: SideBarSubItemProps) {
    const navigate = useNavigate()

    return (
        <li className={location.hash.slice(1) === route ? style.SideBarSubItemContainerActive : style.SideBarSubItemContainer} onClick={() => { navigate(route); }}>
            <img src={icon} /> <span className={style.SideBarSubItemLabel}>{label}</span>
            {showBadge ? <div className={style.BadgeContainer}><Badge value='10' /></div> : null}
            <div className={style.TooltipContainer}>
                {label}
            </div>
        </li>
    )
}
