import { CustomAttributeProps } from "../variables/AttributeColumns"

interface FormSectionProps {
    section: string
    description: string
    fields: CustomAttributeProps[]
    visible: boolean
}

export type { FormSectionProps }
