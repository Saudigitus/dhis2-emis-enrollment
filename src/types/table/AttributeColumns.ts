import { type Attribute } from '../generated/models';

interface OptionSetProps {
    value: string
    label: string
}

export interface CustomAttributeProps {
    id: string
    displayName: string
    header: string
    required: string | boolean
    name: string
    labelName: string
    valueType: typeof Attribute.valueType
    disabled: boolean
    visible: boolean
    options?: { optionSet: [OptionSetProps] }
    pattern?: string
    searchable?: boolean
    error?: boolean
    content?: string
    key?: any
}
