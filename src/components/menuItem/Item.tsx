import React from 'react'
import { MenuItem, Help } from "@dhis2/ui"
import { useRecoilState, useRecoilValue } from 'recoil';
import { HeaderFieldsState } from '../../schema/headersSchema';
import { MenuItemsProps } from '../../types/menu/MenuItemTypes';
import { useDataElementsParamMapping, useParams } from '../../hooks';
import { OuQueryString } from '../../schema/headerSearchInputSchema';



export default function Item(props: MenuItemsProps): React.ReactElement {
    const {  menuItems, dataElementId, onToggle } = props;

    const stringQuery = useRecoilValue(OuQueryString);
    const filteredMenuItems = stringQuery
    ? menuItems.filter(item => item.label.toLowerCase().includes(stringQuery.toLowerCase()))
    : menuItems;

    const { add } = useParams();
    const [headerFields, setHeaderFields] = useRecoilState(HeaderFieldsState)
    const paramsMapping = useDataElementsParamMapping()

    const onChange = (selectedOption: { label: string, value: string }) => {
        add(paramsMapping[dataElementId as unknown as keyof typeof paramsMapping], selectedOption.value);
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

    if ((stringQuery && !filteredMenuItems.length) || !menuItems.length) {
        return <Help>
            No items found
        </Help>
    }

    return (
        <>
            {
                filteredMenuItems?.map(menuItem => (
                    < MenuItem onClick={() => { onChange(menuItem) }} key={menuItem.value} label={menuItem.label} />
                ))
            }
        </>
    )
}
