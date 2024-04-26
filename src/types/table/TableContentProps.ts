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
    inactive?: boolean
}

interface RowActionsType {
    label: string
    onClick: (arg?: any) => void
    icon: React.ReactNode
    disabled: boolean
}
interface RowActionsProps {
    row: any
    rowsActions?: RowActionsType[]
}


interface RenderHeaderProps {
    rowsHeader?: CustomAttributeProps[]
    orderBy?: string
    order?: "asc" | "desc"
    // TODO resolve this bug.👇
    createSortHandler?: (property: string) => any
    rowsData?: any[]
    headerData?: CustomAttributeProps[]
    searchActions?: RowActionsType[]
}

interface TableSortProps {
    children?: React.ReactNode
    active: boolean
    direction?: 'asc' | 'desc'
    createSortHandler: (rowsPerPage: string) => void
}


type TableDataProps = Record<string, string>;


export type { TableComponentProps, HeaderCellProps, RowProps,RowActionsType,  RowActionsProps, RenderHeaderProps, TableSortProps, TableDataProps }