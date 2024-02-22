import { useRecoilState } from "recoil";
import { useDataQuery } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { useEffect } from "react";
import { ProgramRuleVariableConfig, ProgramRulesVariablesConfigState } from "../../schema/programRulesVariablesSchema";

const PROGRAM_RULES_VARIABLES_QUERY = {
    results: {
        resource: "programRuleVariables",
        params: {
            fields: "name,dataElement,trackedEntityAttribute,program[id]",
            filter: ["name:ne:default"],
            paging: false

        }
    }
}

type ProgramRulesVariablesQueryResponse = {
    results: {
        programRuleVariables: ProgramRuleVariableConfig[]
    }
}

export function useGetProgramRulesVariables() {
    const { hide, show } = useShowAlerts()
    const [, setProgramRuleVariablesConfigState] = useRecoilState(ProgramRulesVariablesConfigState);

    const { data, loading: loadingPRulesVariables, refetch } = useDataQuery<ProgramRulesVariablesQueryResponse>(PROGRAM_RULES_VARIABLES_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get program rules variables")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(response) {
            setProgramRuleVariablesConfigState(response?.results?.programRuleVariables);
        },
        lazy: true
    })

    useEffect(() => {
        void refetch()
    }, [])

    return { loadingPRulesVariables, refetch }
}
