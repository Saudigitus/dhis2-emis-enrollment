import React from 'react'

interface Props {
    children: React.ReactNode
}

export default function AppConfigurations(props: Props) {
    return (
        <>{props.children}</>
    )
}
