import React from 'react'
import { MenuItem } from "@dhis2/ui"
import { type MenuItemTypes } from '../../types/menu/MenuItemTypes'
import { paramsMapping } from '../../utils/commons/paramsMapping';
import { useParams } from '../../hooks/commons/useQueryParams';
import { useRecoilState } from 'recoil';
import { type HeaderFieldsSchema, HeaderFieldsState } from '../../schema/headersSchema';

export default function Item({ menuItems, optionSetId, onToggle }: { menuItems: MenuItemTypes[], optionSetId: string, onToggle: () => void }): React.ReactElement {
    const { add } = useParams();
    const [headerFields, setHeaderFields] = useRecoilState(HeaderFieldsState)

    const onChange = (selectedOption: { name: string, code: string }) => {
        add(paramsMapping[optionSetId], selectedOption.code);
        const cloneHeader: HeaderFieldsSchema = { ...headerFields }

        const index = cloneHeader.dataElements?.findIndex(x => x.includes(optionSetId))
        if (index !== -1) {
            cloneHeader.dataElements[index] = [`${optionSetId}:in:${selectedOption.code}`]
        } else {
            cloneHeader.dataElements?.length > 0
                ? cloneHeader.dataElements?.push([`${optionSetId}:in:${selectedOption.code}`])
                : cloneHeader.dataElements = [`${optionSetId}:in:${selectedOption.code}`]
        }

        setHeaderFields(cloneHeader);
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
