import React from 'react'
import style from "../Layout.module.css"

export default function SimpleLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={style.LayoutContainer}>
            <main className={style.MainContentContainer}>{children}</main>
        </div>
    )
}
