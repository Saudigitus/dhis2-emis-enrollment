import React from 'react'
import style from "../Layout.module.css"
import { SideBar } from '../../components'
import { LayoutProps } from '../../types/layout/LayoutProps';

export default function SideBarLayout(props: LayoutProps): React.ReactElement {
    const { children } = props;
    return (
        <div className={style.LayoutContainer}>
            <SideBar />
            <main className={style.MainContentContainer}>{children}</main>
        </div>
    )
}
