interface HeadBarTypes {
    id: string
    label: string
    value: string
    placeholder: string
    component?: string
    dataElementId?: string
    selected?:boolean
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
