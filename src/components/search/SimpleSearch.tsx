import React from 'react'
import style from "./Search.module.css"
import { Input } from "@dhis2/ui"
import classNames from 'classnames'
import { SimpleSearchProps } from '../../types/headBar/SimpleSearchProps';
import { useRecoilState } from 'recoil';
import { OuQueryString } from '../../schema/headerSearchInputSchema';

export default function SimpleSearch(props: SimpleSearchProps): React.ReactElement {
    const { children, placeholder, id } = props;

    const [stringQuery, setStringQuery] = useRecoilState(OuQueryString);

    const onChange = (e: { value: string, name: string }) => {
        setStringQuery(e.value);
    }

    return (
        <div className={classNames(style.SimpleSearchContainer, style[id])}>
            <div className={style.SimpleSearcInputContainer}>
                <Input placeholder={placeholder} value={stringQuery} onChange={onChange} initialFocus dense label="An input" name="input" />
            </div>
            <div className={style.ChildrenContentContainer}>{children}</div>
        </div>
    )
}
