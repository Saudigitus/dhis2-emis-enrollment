import { atom } from "recoil";
import { FormattedPRulesType } from "../types/programRules/FormattedPRules";


export const ProgramRulesFormatedState = atom<FormattedPRulesType[]>({
    key: "programRuleFormated-get-state",
    default: []
})
