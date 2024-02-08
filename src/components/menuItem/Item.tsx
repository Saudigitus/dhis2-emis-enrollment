import React from 'react'
import { MenuItem } from "@dhis2/ui"
import { useRecoilState } from 'recoil';
import { HeaderFieldsState } from '../../schema/headersSchema';
import { MenuItemsProps } from '../../types/menu/MenuItemTypes';
import { useDataElementsParamMapping, useParams } from '../../hooks';



export default function Item(props: MenuItemsProps): React.ReactElement {
    const {  menuItems, dataElementId, onToggle } = props;
    
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
