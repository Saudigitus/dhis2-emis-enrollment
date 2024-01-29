import { type Attribute } from '../generated/models';

export enum VariablesTypes {
    DataElement = "dataElement",
    Attribute = "attribute"
}

export interface CustomAttributeProps {
    id: string
    displayName: string
    header: string
    required: boolean
    name: string
    programStage?: string
    assignedValue?: string
    labelName: string
    valueType: typeof Attribute.valueType
    disabled: boolean
    visible: boolean
    options: {
        optionSet: {
            id: string
            options: OptionsProps[]
        }
    }
    pattern?: string
    searchable?: boolean
    error?: boolean
    content?: string
    key?: any
    description?: string
    type: VariablesTypes
}

export interface OptionsProps {
    value: string
    label: string
}
