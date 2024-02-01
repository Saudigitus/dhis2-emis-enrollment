import React from 'react'
import style from "../Layout.module.css"
import { LayoutProps } from '../../types/common/components';

export default function SimpleLayout(props: LayoutProps) {
    const { children } = props;
    return (
        <div className={style.LayoutContainer}>
            <main className={style.MainContentContainer}>{children}</main>
        </div>
    )
}
