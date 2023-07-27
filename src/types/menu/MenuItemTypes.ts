interface MenuItemTypes {
    displayName: string
    value: string
    id: string
    name: string
    code: string
    optionSetId: string
}
type ComponentMapping = Record<string, React.ComponentType<any>>;

type ParamsMapping = Record<string, string>;

export type { MenuItemTypes, ComponentMapping, ParamsMapping }
