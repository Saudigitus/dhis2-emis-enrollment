import React from 'react'
import style from "../Layout.module.css"
import { MainHeader, SideBar } from '../../components'

export default function FullLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={style.LayoutContainer}>
            <SideBar />
            <div className={style.FullLayoutContainer}>
                <MainHeader />
                <main className={style.MainContentContainer}>{children}</main>
            </div>
        </div>
    )
}
