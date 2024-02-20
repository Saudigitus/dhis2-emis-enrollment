import { atom } from "recoil"


export interface ProgramRuleVariableConfig {
    name: string
    program: {
        id: string
    }
    trackedEntityAttribute?: {
        id: string
    }
    dataElement?: {
        id: string
    }
}

export const ProgramRulesVariablesConfigState = atom<ProgramRuleVariableConfig[]>({
    key: "programRuleVariableConfig-get-state",
    default: []
})
