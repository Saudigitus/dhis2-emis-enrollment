import { CustomAttributeProps } from "../variables/AttributeColumns"

interface TableProps {
    head: any
    footer: any
}

interface TableComponentProps {
    children?: React.ReactNode
    className?: string
}

interface HeaderCellProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: TableProps
    colspan?: number
    onClick?: () => void
}

interface RowProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: TableProps
}

interface RowActionsType {
    label: string
    divider: boolean
    onClick: () => void
}
interface RowActionsProps {
    options: RowActionsType[]
}


interface RenderHeaderProps {
    rowsHeader?: CustomAttributeProps[]
    orderBy?: string
    order?: "asc" | "desc"
    // TODO resolve this bug.👇
    createSortHandler?: (property: string) => any
    rowsData?: any[]
    headerData?: CustomAttributeProps[]
}

interface TableSortProps {
    children?: React.ReactNode
    active: boolean
    direction?: 'asc' | 'desc'
    createSortHandler: (rowsPerPage: string) => void
}


type TableDataProps = Record<string, string>;


export type { TableComponentProps, HeaderCellProps, RowProps,RowActionsType,  RowActionsProps, RenderHeaderProps, TableSortProps, TableDataProps }