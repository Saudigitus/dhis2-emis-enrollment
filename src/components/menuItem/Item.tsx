import React from 'react'
import { MenuItem } from "@dhis2/ui"
import { type MenuItemTypes } from '../../types/menu/MenuItemTypes'
import { paramsMapping } from '../../utils/commons/paramsMapping';
import { useParams } from '../../hooks/commons/useQueryParams';

export default function Item({ menuItems, optionSetId, onToggle }: { menuItems: MenuItemTypes[], optionSetId: string, onToggle: () => void }): React.ReactElement {
    const { add } = useParams();
    const onChange = (selectedOption: object) => {
        add(paramsMapping[optionSetId], selectedOption?.name);
        onToggle()
    }

    return (
        <>
            {
                menuItems.map(menuItem => (
                    < MenuItem onClick={() => { onChange(menuItem) }} key={menuItem.id} label={menuItem.displayName} />
                ))
            }
        </>
    )
}
