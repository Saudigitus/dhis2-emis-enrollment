import { type Access } from "../generated"

export interface ProgramConfig {
    displayName: string
    id: string
    description: string
    access: Access
    programType: string
    programStages: [{
        autoGenerateEvent: boolean
        displayName: string
        id: string
        programStageDataElements: [
            {
                displayInReports: boolean
                compulsory: boolean
                dataElement: {
                    displayInReports: boolean | undefined
                    displayName: string
                    id: string
                    valueType: string
                    optionSet: {
                        id: string
                        options: {
                            [x: string]: any
                            value: string
                            label: string
                        }
                    }
                }
            }
        ]

    }]

    programTrackedEntityAttributes: [{
        trackedEntityAttribute: {
            displayName: string
            generated: boolean
            pattern: string | undefined
            id: string
            valueType: string
            optionSet: {
                id: string
                options: {
                    [x: string]: any
                    value: string
                    label: string
                }
            }
        }
        searchable: boolean
        displayInList: boolean
        mandatory: boolean
    }]
    trackedEntityType: {
        trackedEntityTypeAttributes: [{
            trackedEntityAttribute: {
                id: string
            }
        }]
        id: string
    }
}
