import React from 'react'
import style from "../Layout.module.css"
import { SideBar } from '../../components'

export default function SideBarLayout({ children }: { children: React.ReactNode }): React.ReactElement {
    return (
        <div className={style.LayoutContainer}>
            <SideBar />
            <main className={style.MainContentContainer}>{children}</main>
        </div>
    )
}
