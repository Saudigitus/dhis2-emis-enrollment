import React from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { AppConfigurationsProps } from '../types/app/AppConfigurationsProps';
import { useDataStore } from '../hooks';
import { useGetProgramRules } from '../hooks/programRules/useGetProgramRules';
import { useGetProgramRulesVariables } from '../hooks/programRules/useGetProgramRulesVariables';
import { useGetOptionGroups } from '../hooks/optionGroup/useGetOptionGroups';

export default function AppWrapper(props: AppConfigurationsProps) {
    const { error, loading } = useDataStore()
    const { loadingPRules } = useGetProgramRules();
    const { loadingPRulesVariables } = useGetProgramRulesVariables();
    const { loadingOptionGroups } = useGetOptionGroups();

    if (loading || loadingPRules || loadingPRulesVariables || loadingOptionGroups) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error != null) {
        return (
            <CenteredContent>
                Something went wrong wen loading the app, please check if you app is already configured
            </CenteredContent>
        )
    }

    return (
        <>{props.children}</>
    )
}
