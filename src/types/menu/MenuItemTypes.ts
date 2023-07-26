interface MenuItemTypes {
    displayName: string
    value: string
    id: string
    name: string
    code: string
}
type ComponentMapping = Record<string, React.ComponentType<any>>;

export type { MenuItemTypes, ComponentMapping }
