import { FlyoutOptionsProps } from "./FlyoutOptionsProps"

interface DropdownButtonComponentProps {
    name: string
    icon?: React.ReactNode
    options: FlyoutOptionsProps[]
    disabled: boolean
}

export type { DropdownButtonComponentProps }
