import React from 'react'
import style from "../Layout.module.css"
import { MainHeader } from '../../components'

export default function HeadBarLayout({ children }: { children: React.ReactNode }): React.ReactElement {
    return (
        <div className={style.HeadBarLayoutContainer}>
            <MainHeader />
            <main className={style.MainContentContainer}>{children}</main>
        </div>
    )
}
