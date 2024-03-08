import { CustomAttributeProps } from "../variables/AttributeColumns"

interface GroupFormProps {
    name: string
    description: string
    fields: CustomAttributeProps[]
    disabled: boolean
    bulkUpdate?: boolean
}

export type { GroupFormProps }