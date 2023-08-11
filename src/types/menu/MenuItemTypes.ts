interface MenuItemTypes {
    label: string
    value: string
}

type ComponentMapping = Record<string, React.ComponentType<any>>;

type ParamsMapping = Record<string, string>;

export type { MenuItemTypes, ComponentMapping, ParamsMapping }
