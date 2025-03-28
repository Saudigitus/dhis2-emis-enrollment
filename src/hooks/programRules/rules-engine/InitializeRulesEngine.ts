import { useRecoilState } from "recoil"
import { useFormatProgramRules } from "../useFormatProgramRules"
import { useFormatProgramRulesVariables } from "../useFormatProgramRulesVariables"
import { ProgramRulesFormatedState } from "../../../schema/programRulesFormated"

export const initializeRulesEngine = () => {
    const { programRules } = useFormatProgramRules()
    const { programRulesVariables } = useFormatProgramRulesVariables()
    const [newProgramRules, setnewProgramRules] = useRecoilState(ProgramRulesFormatedState)

    function initialize() {
        if (programRules?.length > 0 && Object.keys(programRulesVariables)?.length > 0 && newProgramRules?.length === 0) {
            setnewProgramRules(programRules)
        }
    }

    return {
        initialize
    }

}