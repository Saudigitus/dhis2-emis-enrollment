interface FlyoutComponentProps {
    options: FlyoutOptionsProps[]
}

interface FlyoutOptionsProps {
    label: string
    divider: boolean
    onClick: () => void
}

export type { FlyoutOptionsProps, FlyoutComponentProps }
