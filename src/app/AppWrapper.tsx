import React from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { AppConfigurationsProps } from '../types/app/AppConfigurationsProps';
import { useDataStore } from '../hooks';

export default function AppWrapper(props: AppConfigurationsProps) {
    const { error, loading } = useDataStore()

    if (loading) {
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
