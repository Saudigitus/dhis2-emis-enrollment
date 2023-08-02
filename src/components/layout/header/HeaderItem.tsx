import React, { useState } from 'react'
import style from "./MainHeader.module.css"
import { DropdownButton, FlyoutMenu } from "@dhis2/ui"
import { type HeadBarTypes } from '../../../types/headBar/HeadBarTypes'
import info from "../../../assets/images/headbar/info.svg"
import { SimpleSearch } from '../../search'
import { componentMapping } from '../../../utils/commons/componentMapping'
import classNames from 'classnames'

export default function HeaderItem({ label, value, placeholder, component, dataElementId, id }: HeadBarTypes): React.ReactElement {
    const Component = (component != null) ? componentMapping[component] : null;
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const onToggle = () => { setOpenDropDown(!openDropDown) }

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
