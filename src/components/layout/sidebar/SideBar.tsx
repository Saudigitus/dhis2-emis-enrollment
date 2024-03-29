import React, { useState } from 'react'
import style from "./SideBar.module.css"
import SideBarItem from './SideBarItem'
import { sideBarData } from "../../../utils/constants/sideBar/sideBarData"
import SibeBarCollapseBtn from './SibeBarCollapseBtn';
import { getDataStoreKeys } from '../../../utils/commons/dataStore/getDataStoreKeys';
import { useLocation } from 'react-router-dom';

export default function SideBar(): React.ReactElement {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const { filterItems } = getDataStoreKeys()
    const location = useLocation()  

    return (
        <aside className={collapsed ? style.SideBarContainerCollapsed : style.SideBarContainer}>
            <div className={style.SideBarMenu}>
                {
                    sideBarData(location.search, filterItems).map((element, index) => (
                        <SideBarItem key={index} title={element.title} subItems={element.subItems} />
                    ))
                }
            </div>
            <SibeBarCollapseBtn collapsed={collapsed} setCollapsed={setCollapsed} />
        </aside>
    )
}
