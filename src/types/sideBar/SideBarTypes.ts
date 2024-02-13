
interface SideBarItemProps {
    title: string
    subItems: SideBarSubItemProps[]
}

interface SideBarItemTitleProps {
    title: string
}

interface SideBarSubItemProps {
    label: string
    showBadge: boolean
    icon: string
    disabled: boolean
    route: string
    appName: string
    pathName?: string
}

interface SideBarCollapseProps {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}


interface BadgeProps {
    value: string
}
export type { SideBarItemProps, SideBarItemTitleProps, SideBarSubItemProps, SideBarCollapseProps, BadgeProps }
