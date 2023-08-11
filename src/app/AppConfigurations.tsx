import React from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { useGetProgramConfig } from '../hooks/programConfig/useGetprogramConfig';

interface Props {
    children: React.ReactNode
}

export default function AppConfigurations(props: Props) {
    const { loading } = useGetProgramConfig()

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    return (
        <>{props.children}</>
    )
}
