interface DashboardCardProps {
    title: string
    subItem: CardSubItemProps[]
}

interface CardSubItemProps {
    icon: string
    title: string
    leftLabel: string
    program: string
    formLink: string
    listLink: string
}
export type {DashboardCardProps, CardSubItemProps}
