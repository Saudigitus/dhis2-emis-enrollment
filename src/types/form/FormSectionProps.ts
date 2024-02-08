import { CustomAttributeProps } from "../variables/AttributeColumns"

interface FormSectionProps {
    section: string
    description: string
    fields: CustomAttributeProps[]
}

export type { FormSectionProps }
