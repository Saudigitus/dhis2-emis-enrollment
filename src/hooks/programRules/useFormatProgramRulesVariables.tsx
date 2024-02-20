import { useRecoilValue } from "recoil";
import { formatProgramRuleVariables } from "../../utils/programRules/formatProgramRules";
import { ProgramRulesVariablesConfigState } from "../../schema/programRulesVariablesSchema";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

export function useFormatProgramRulesVariables() {
    const programRulesVariablesConfigState = useRecoilValue(ProgramRulesVariablesConfigState);

    const { program } = getDataStoreKeys()

    return {
        programRulesVariables: formatProgramRuleVariables(programRulesVariablesConfigState, program),
    }
}