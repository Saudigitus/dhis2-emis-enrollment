import React from 'react'
import style from "../Layout.module.css"
import { MainHeader } from '../../components'
import { LayoutProps } from '../../types/layout/LayoutProps';

export default function HeadBarLayout(props: LayoutProps): React.ReactElement {
    const { children } = props;
    return (
        <div className={style.HeadBarLayoutContainer}>
            <MainHeader />
            <main className={style.MainContentContainer}>{children}</main>
        </div>
    )
}
