import React from 'react'
import style from "./MainHeader.module.css"
import { DropdownButton, FlyoutMenu } from "@dhis2/ui"
import { type HeadBarTypes } from '../../../types/headBar/HeadBarTypes'
import { SimpleSearch } from '../../search'
import { componentMapping } from '../../../utils/commons/componentMapping'

export default function HeaderItem({ label, value, placeholder, component, optionSetId }: HeadBarTypes): React.ReactElement {
    const Component = (component != null) ? componentMapping[component] : null;
    return (
        <DropdownButton
            className={style.HeaderItemContainer}
            component={
                <FlyoutMenu>
                    <SimpleSearch placeholder={placeholder}>
                        {(Component != null) && <Component optionSetId={optionSetId} />}
                    </SimpleSearch>
                </FlyoutMenu>
            }
        >
            <h5>{label} <span>{value}</span></h5>
        </DropdownButton>
    )
}
