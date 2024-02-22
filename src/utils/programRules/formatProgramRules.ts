import { ProgramRuleConfig } from "../../schema/programRulesSchema";
import { ProgramRuleVariableConfig } from "../../schema/programRulesVariablesSchema";
import { FormattedPRulesType, PRTypes } from "../../types/programRules/FormattedPRules";


export function formatProgramRules(programRules: ProgramRuleConfig []) {
    const programRulesResponses: FormattedPRulesType [] = [];
    for (const prules of programRules || []) {
        // console.log(prules);
        for (const pRulesAction of prules.programRuleActions) {
            programRulesResponses.push({
                condition: prules.condition,
                programRuleActionType: pRulesAction.programRuleActionType,
                variable: pRulesAction?.dataElement?.id || pRulesAction?.trackedEntityAttribute?.id || pRulesAction?.programStageSection?.id,
                type: pRulesAction?.dataElement?.id && PRTypes.DATA_ELEMENT || pRulesAction?.trackedEntityAttribute?.id && PRTypes.ATTRIBUTE || pRulesAction?.programStageSection?.id && PRTypes.SECTION,
                content: prules.content,
                programStage: prules?.programStage?.id,
                data: pRulesAction.data,
                optionGroup: pRulesAction?.optionGroup?.id,
                displayName: pRulesAction?.displayName,
                id: pRulesAction?.id,
                program: prules?.program?.id
            })
        }
    }

    return programRulesResponses;
}

export function formatProgramRuleVariables(programRuleVariables: ProgramRuleVariableConfig [], program: string | null) {
    const programRuleVariablesResponses: Record<string, string | undefined> = {};

    for (const pRulesVariable of programRuleVariables || []) {
        if(pRulesVariable.program.id === program)
        programRuleVariablesResponses[pRulesVariable?.name.trim()] = pRulesVariable?.dataElement?.id || pRulesVariable?.trackedEntityAttribute?.id
    }

    return programRuleVariablesResponses;
}