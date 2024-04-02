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
    school: string | null
    schoolName: string | null
    class?: string | null
    grade?: string | null
    position?: string | null
    employmentType?: string | null
}

export type { HeadBarTypes, SelectedOptionsTypes }
