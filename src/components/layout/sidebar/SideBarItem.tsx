import React from 'react'
import classNames from 'classnames';
import style from "./SideBar.module.css"
import SideBarSubItem from './SideBarSubItem'
import SideBarItemTitle from './SideBarItemTitle'
import { SideBarItemProps } from '../../../types/sideBar/SideBarTypes'

export default function SideBarItem(props: SideBarItemProps): React.ReactElement {
    const { title, subItems } = props;
    
    return (
        <section className={style.SideBarItemContainer}>
            <SideBarItemTitle title={title} />
            <ul className={style.SideBarItemListContainer}>
                {subItems.map((subItem, index) => (
                    <SideBarSubItem pathName={subItem.pathName} route={subItem.route} key={index} icon={subItem.icon} label={subItem.label} showBadge={subItem.showBadge} disabled={subItem.disabled} appName={subItem.appName} />
                ))}
            </ul>
        </section>
    )
}
