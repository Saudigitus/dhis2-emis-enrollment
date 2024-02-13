type EnumBorderType = "all" | "bottom" | "top"
interface WithBorderProps { 
    children?: React.ReactNode
    type: EnumBorderType 
}

interface WithPaddingProps {
    children?: React.ReactNode
    p?: string 
}

interface TitleProps {
    label: string
}

export type { WithBorderProps, WithPaddingProps, TitleProps}