interface MenuItemTypes {
    displayName: string
    value: string
    id: string
}
type ComponentMapping = Record<string, React.ComponentType<any>>;

export type { MenuItemTypes, ComponentMapping }
