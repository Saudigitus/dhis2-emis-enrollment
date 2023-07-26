import React from 'react'
import style from "./MainHeader.module.css"
import { DropdownButton, FlyoutMenu } from "@dhis2/ui"
import { type HeadBarTypes } from '../../../types/headBar/HeadBarTypes'
import info from "../../../assets/images/headbar/info.svg"
import { SimpleSearch } from '../../search'
import { componentMapping } from '../../../utils/commons/componentMapping'
import classNames from 'classnames'

export default function HeaderItem({ label, value, placeholder, component, optionSetId, id }: HeadBarTypes): React.ReactElement {
    const Component = (component != null) ? componentMapping[component] : null;
    return (
        <DropdownButton
            className={classNames(style.HeaderItemContainer, style[id])}
            component={
                <FlyoutMenu>
                    <SimpleSearch id={id} placeholder={placeholder}>
                        {(Component != null) && <Component optionSetId={optionSetId} />}
                    </SimpleSearch>
                </FlyoutMenu>
            }
        >
            <h5>{label} <span>{value}</span></h5>
            <img src={info} />
        </DropdownButton>
    )
}
