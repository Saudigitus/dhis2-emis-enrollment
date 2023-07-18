import React from 'react'
import style from "./Search.module.css"
import { Input } from "@dhis2/ui"

export default function SimpleSearch({ children, placeholder }: { children: React.ReactNode, placeholder: string }): React.ReactElement {
    return (
        <div className={style.SimpleSearchContainer}>
            <div className={style.SimpleSearcInputContainer}>
                <Input placeholder={placeholder} initialFocus dense label="An input" name="input" />
            </div>
            <div className={style.ChildrenContentContainer}>{children}</div>
        </div>
    )
}
