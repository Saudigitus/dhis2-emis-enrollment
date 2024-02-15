import React, { useState } from 'react'
import style from "./MainHeader.module.css"
import { DropdownButton, FlyoutMenu } from "@dhis2/ui"
import info from "../../../assets/images/headbar/info.svg"
import { SimpleSearch } from '../../search'
import { componentMapping } from '../../../utils/commons/componentMapping'
import classNames from 'classnames'
import { HeadBarTypes } from '../../../types/headBar/HeadBarTypes'
import { useRecoilState } from 'recoil'
import { OuQueryString } from '../../../schema/headerSearchInputSchema'

export default function HeaderItem(props: HeadBarTypes): React.ReactElement {
    const { label, value, placeholder, component, dataElementId, id } = props;
    const Component = (component != null) ? componentMapping[component] : null;
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [, setStringQuery] = useRecoilState(OuQueryString);

    const onToggle = () => {
        setStringQuery(undefined)
        setOpenDropDown(!openDropDown)
    }

    return (
        <DropdownButton
            open={openDropDown}
            onClick={onToggle}
            className={classNames(style.HeaderItemContainer, style[id])}
            component={
                < FlyoutMenu >
                    <SimpleSearch id={id} placeholder={placeholder}>
                        {(Component != null) && <Component dataElementId={dataElementId} onToggle={onToggle} />}
                    </SimpleSearch>
                </FlyoutMenu >
            }
        >
            <h5>{label} <span>{value}</span></h5>
            <img src={info} />
        </DropdownButton >
    )
}
