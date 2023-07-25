import React from 'react'
import { MenuItem } from "@dhis2/ui"
import { type MenuItemTypes } from '../../types/menu/MenuItemTypes'

export default function Item({ menuItems }: { menuItems: MenuItemTypes[] }): React.ReactElement {
    return (
        <>
            {
                menuItems.map(menuItem => (
                    < MenuItem key={menuItem.id} label={menuItem.displayName} />
                ))
            }
        </>
    )
}
