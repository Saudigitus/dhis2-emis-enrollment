import { type CustomAttributeProps } from "../table/AttributeColumns"

interface GenericFieldsProps {
    disabled: boolean
    required: string | boolean
    type?: string
    optionSet?: CustomAttributeProps["options"]
}

export type {GenericFieldsProps}
