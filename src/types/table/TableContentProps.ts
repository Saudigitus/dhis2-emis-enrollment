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
    isOwnershipOu?: boolean
}

interface RowActionsType {
    label: string
    onClick: (arg?: any) => void
    icon: React.ReactNode
    disabled: boolean
    color?: string
}
interface RowActionsProps {
    row: any
    onSelectTei?: (arg: any) => void
    onShowHistory?: () => void
}


interface RenderHeaderProps {
    rowsHeader?: CustomAttributeProps[]
    orderBy?: string
    order?: "asc" | "desc"
    // TODO resolve this bug.👇
    createSortHandler?: (property: string) => any
    rowsData?: any[]
    loading?: boolean, 
    headerData?: CustomAttributeProps[]
    searchActions?: boolean
    onSelectTei?: (arg: any) => void
}

interface EnrollmentDetailsComponentProps {
    enrollmentsData: any
    existingAcademicYear: boolean
    onSelectTei?: (arg: any) => void
}

interface TableSortProps {
    children?: React.ReactNode
    active: boolean
    direction?: 'asc' | 'desc'
    createSortHandler: (rowsPerPage: string) => void
}


type TableDataProps = Record<string, string>;


export type { TableComponentProps, HeaderCellProps, RowProps,RowActionsType,  RowActionsProps, RenderHeaderProps, EnrollmentDetailsComponentProps, TableSortProps, TableDataProps }