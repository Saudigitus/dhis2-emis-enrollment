interface HeadBarTypes {
    id: string
    label: string
    value: string
    placeholder: string
    component?: string
    optionSetId?: string
}

interface SelectedOptionsTypes {
    academicYear: string | null
    class: string | null
    grade: string | null
    school: string | null
    schoolName: string | null
}
export type { HeadBarTypes, SelectedOptionsTypes }
