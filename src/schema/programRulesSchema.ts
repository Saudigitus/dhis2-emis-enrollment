import { atom } from "recoil"


export interface ProgramRuleConfig {
    id: string
    condition: string
    displayName: string
    description: string
    program: {
        id: string
    }
    programRuleActions: {
        id: string
        programRuleActionType: string
        trackedEntityAttribute?: {
            id: string
        }
        dataElement?: {
            id: string
        }
        optionGroup?: {
            id: string
        }
        programStageSection?: {
            id: string
        }
        data?: string
        displayName?: string
    } []
    content?: string
    programStage?: {
        id: string
    }

}

export const ProgramRulesConfigState = atom<ProgramRuleConfig[]>({
    key: "programRuleConfig-get-state",
    default: []
})
