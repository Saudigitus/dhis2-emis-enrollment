
interface MenuItemsProps { 
    menuItems: MenuItemTypes[]
    dataElementId: string
    onToggle: () => void
 }

interface MenuItemTypes {
    label: string
    value: string
}

interface MenuItemContainerProps {
    dataElementId: string
    onToggle: () => void
}

type ComponentMapping = Record<string, React.ComponentType<any>>;

type ParamsMapping = Record<string, string>;

export type { MenuItemTypes, ComponentMapping, ParamsMapping, MenuItemsProps, MenuItemContainerProps }
