import React from 'react';
import classNames from 'classnames';
import Badge from '../../badge/Badge';
import style from "./SideBar.module.css"
import { useParams } from '../../../hooks';
import { useConfig } from '@dhis2/app-runtime';
import { useLocation } from 'react-router-dom';
import { SideBarSubItemProps } from '../../../types/sideBar/SideBarTypes';

export default function SideBarSubItem(props: SideBarSubItemProps) {
    const { icon, label, showBadge, disabled, route, appName, pathName } = props;
    const { baseUrl } = useConfig()
    const location = useLocation()
    const { urlParamiters } = useParams()
    const { sectionType } = urlParamiters()
    const formattedPathName = `${location.pathname}/${sectionType}`

    return (
        <a href={`${baseUrl}/api/apps/${appName}/index.html#/${route}`} className={style.subItemLink}>
            <li className={formattedPathName === pathName ? style.SideBarSubItemContainerActive : classNames(style.SideBarSubItemContainer, (Boolean(disabled)) && style.SideBarDisabledSubItem)}>
                <img src={icon} /> <span className={style.SideBarSubItemLabel}>{label}</span>
                {showBadge ? <div className={style.BadgeContainer}><Badge value='10' /></div> : null}
                <div className={style.TooltipContainer}>
                    {label}
                </div>
            </li>
        </a>
    )
}
