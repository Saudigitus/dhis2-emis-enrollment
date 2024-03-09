import { CustomAttributeProps, OptionsProps } from "../variables/AttributeColumns"

interface GenericFieldsComponentProps {
    attribute: CustomAttributeProps
    disabled: boolean
    valueType: CustomAttributeProps["valueType"]
}

interface FormFieldsProps {
    disabled: boolean
    required: string | boolean
    type?: string
    optionSet?: CustomAttributeProps["options"]]
    trackedEntity?: string
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

interface CheckFieldProps {
    disabled: boolean
    required: string | boolean
}


interface SingleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}


export type { GenericFieldsComponentProps, FormFieldsProps, MutlipleSelectProps, AutoCompleteProps, SwitchFieldProps, CheckFieldProps, SingleSelectProps }
