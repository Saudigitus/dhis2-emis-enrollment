import { CustomAttributeProps } from "../variables/AttributeColumns"

interface GroupFormProps {
    name: string
    description: string
    fields: CustomAttributeProps[]
    disabled: boolean
}

export type { GroupFormProps }