import React from 'react'
import { AppConfigurationsProps } from '../types/app/AppConfigurationsProps'

export default function AppConfigurations(props: AppConfigurationsProps) {
    return (
        <>{props.children}</>
    )
}
