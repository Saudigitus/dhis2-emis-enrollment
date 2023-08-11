import React from 'react'
import { MenuItem } from "@dhis2/ui"
import { type MenuItemTypes } from '../../types/menu/MenuItemTypes'
import { paramsMapping } from '../../utils/commons/paramsMapping';
import { useParams } from '../../hooks/commons/useQueryParams';
import { useRecoilState } from 'recoil';
import { HeaderFieldsState } from '../../schema/headersSchema';

export default function Item({ menuItems, dataElementId, onToggle }: { menuItems: MenuItemTypes[], dataElementId: string, onToggle: () => void }): React.ReactElement {
    const { add } = useParams();
    const [headerFields, setHeaderFields] = useRecoilState(HeaderFieldsState)

    const onChange = (selectedOption: { label: string, value: string }) => {
        add(paramsMapping[dataElementId], selectedOption.value);
        let dataElements: string[][] = [...headerFields.dataElements]
        const attributes: string[][] = [...headerFields.attributes]

        const index = dataElements?.findIndex(x => x?.toString()?.includes(dataElementId))

        if (index !== -1) {
            dataElements[index] = [`${dataElementId}:in:${selectedOption.value}`]
        } else {
            dataElements = [...dataElements, [`${dataElementId}:in:${selectedOption.value}`]]
        }

        setHeaderFields({ attributes, dataElements });
        onToggle()
    }

    return (
        <>
            {
                menuItems?.map(menuItem => (
                    < MenuItem onClick={() => { onChange(menuItem) }} key={menuItem.value} label={menuItem.label} />
                ))
            }
        </>
    )
}
