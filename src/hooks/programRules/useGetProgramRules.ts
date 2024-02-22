import { useRecoilState } from "recoil";
import { useDataQuery } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { useEffect } from "react";
import { ProgramRuleConfig, ProgramRulesConfigState } from "../../schema/programRulesSchema";

const PROGRAM_RULES_QUERY = {
    results: {
        resource: "programRules",
        params: {
            fields: "id,displayName,condition,description,program[id],programStage[id],priority,programRuleActions[id,content,location,data,programRuleActionType,programStageSection[id],dataElement[id],trackedEntityAttribute[id],option[id],optionGroup[id],programIndicator[id],programStage[id]]",
            paging: false

        }
    }
}

type ProgramRulesQueryResponse = {
    results: {
        programRules: ProgramRuleConfig[]
    }
}

export function useGetProgramRules() {
    const { hide, show } = useShowAlerts()
    const [, setProgramRulesConfigState] = useRecoilState(ProgramRulesConfigState);

    const { data, loading: loadingPRules, refetch } = useDataQuery<ProgramRulesQueryResponse>(PROGRAM_RULES_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get program rules")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(response) {
            setProgramRulesConfigState(response?.results?.programRules);
        },
        lazy: true
    })

    useEffect(() => {
        void refetch()
    }, [])

    return { loadingPRules, refetch }
}
