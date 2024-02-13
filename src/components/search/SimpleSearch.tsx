import React from 'react'
import style from "./Search.module.css"
import { Input } from "@dhis2/ui"
import classNames from 'classnames'
import { SimpleSearchProps } from '../../types/headBar/SimpleSearchProps';

export default function SimpleSearch(props: SimpleSearchProps): React.ReactElement {
    const { children, placeholder, id } = props;
    return (
        <div className={classNames(style.SimpleSearchContainer, style[id])}>
            <div className={style.SimpleSearcInputContainer}>
                <Input placeholder={placeholder} initialFocus dense label="An input" name="input" />
            </div>
            <div className={style.ChildrenContentContainer}>{children}</div>
        </div>
    )
}
