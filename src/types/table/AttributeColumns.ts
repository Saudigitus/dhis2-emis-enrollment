import { type Attribute } from '../generated/models';
import { type Access } from "../generated"

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
    options: { optionSet: [OptionSetProps] }
    visible: boolean
    disabled: boolean
    pattern?: string
    searchable?: boolean
    error?: boolean
    content?: string
    key?: any
    access?: Access
}
