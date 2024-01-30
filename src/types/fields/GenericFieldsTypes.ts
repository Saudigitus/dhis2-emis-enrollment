import {type OptionsProps, type CustomAttributeProps } from "../table/AttributeColumns"

interface GenericFieldsComponentProps {
    attribute: CustomAttributeProps
    disabled: boolean
    valueType: CustomAttributeProps["valueType"]
}

interface GenericFieldsProps {
    disabled: boolean
    required: string | boolean
    type?: string
    optionSet?: CustomAttributeProps["options"]
}

interface MutlipleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}

interface AutoCompleteProps {
    disabled?: boolean
    options?: CustomAttributeProps["options"]
    name: string
    required?: string | boolean
}

interface SwitchFieldProps {
    disabled: boolean
    required: string | boolean
}

export type { GenericFieldsComponentProps, GenericFieldsProps, MutlipleSelectProps, AutoCompleteProps, SwitchFieldProps }
