interface ButtonActionProps {
    label: string
    primary?: boolean
    destructive?: boolean
    secondary?: boolean
    disabled: boolean
    onClick: () => void

}

export type { ButtonActionProps }
