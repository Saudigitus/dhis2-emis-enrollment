interface HeadBarTypes {
    component?: string
    dataElementId?: string
    disabled?: boolean
    id: string
    label: string
    placeholder: string
    selected?: boolean
    value: string
}

interface SelectedOptionsTypes {
    academicYear: string | null
    class: string | null
    grade: string | null
    school: string | null
    schoolName: string | null
}
export type { HeadBarTypes, SelectedOptionsTypes }
