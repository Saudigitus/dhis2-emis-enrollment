export enum PRTypes {
    DATA_ELEMENT = 'dataElement',
    ATTRIBUTE = "attribute",
    SECTION = "section"
}


export interface FormattedPRulesType {
    condition?: string
    programRuleActionType?: string
    variable?: string
    type?: PRTypes | undefined | ""
    content?: string | undefined
    programStage?: string | undefined
    data?: string | undefined
    optionGroup?: string | undefined
    displayName?: string | undefined
    id?: string
    program?: string
    functionName?: string
}