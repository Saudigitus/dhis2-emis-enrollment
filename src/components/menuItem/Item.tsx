import React from 'react'
import { MenuItem } from "@dhis2/ui"
import { type MenuItemTypes } from '../../types/menu/MenuItemTypes'
import { paramsMapping } from '../../utils/commons/paramsMapping';
import { useParams } from '../../hooks/commons/useQueryParams';
import { useRecoilState } from 'recoil';
import { type HeaderFieldsSchema, HeaderFieldsState } from '../../schema/headersSchema';

export default function Item({ menuItems, dataElementId, onToggle }: { menuItems: MenuItemTypes[], dataElementId: string, onToggle: () => void }): React.ReactElement {
    const { add } = useParams();
    const [headerFields, setHeaderFields] = useRecoilState(HeaderFieldsState)
    console.log(menuItems);

    const onChange = (selectedOption: { name: string, code: string }) => {
        add(paramsMapping[dataElementId], selectedOption.code);
        const cloneHeader: HeaderFieldsSchema = { ...headerFields }

        const index = cloneHeader.dataElements?.findIndex(x => x.includes(dataElementId))
        if (index !== -1) {
            cloneHeader.dataElements[index] = [`${dataElementId}:in:${selectedOption.code}`]
        } else {
            cloneHeader.dataElements?.length > 0
                ? cloneHeader.dataElements?.push([`${dataElementId}:in:${selectedOption.code}`])
                : cloneHeader.dataElements = [`${dataElementId}:in:${selectedOption.code}`]
        }

        setHeaderFields(cloneHeader);
        onToggle()
    }

    return (
        <>
            {
                menuItems?.map(menuItem => (
                    < MenuItem onClick={() => { onChange(menuItem) }} key={menuItem.id} label={menuItem.displayName} />
                ))
            }
        </>
    )
}
