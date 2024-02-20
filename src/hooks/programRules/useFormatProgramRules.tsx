import { useRecoilValue } from "recoil";
import { ProgramRulesConfigState } from "../../schema/programRulesSchema";
import { formatProgramRules } from "../../utils/programRules/formatProgramRules";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

export function useFormatProgramRules() {
    const programRulesConfigState = useRecoilValue(ProgramRulesConfigState);

    const { program } = getDataStoreKeys()

    return {
        programRules: formatProgramRules(programRulesConfigState).filter(pRule => pRule.program === program),
    }
}
