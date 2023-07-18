interface FormSectionProps {
    section: string
    description: string
    fields: SectionFieldsProps[]
}

interface SectionFieldsProps {
    label: string
    attribute: string
    valueType: string
    placeholder: string
    disabled: boolean
    visible: boolean
}
export type {FormSectionProps, SectionFieldsProps}
