import { type Access } from "../generated"

export interface ProgramConfig {
    displayName: string
    id: string
    description: string
    access: Access
    programType: string
    programStages: [
        {
            autoGenerateEvent: boolean
            displayName: string
            id: string
            programStageDataElements: [
                {
                    displayInReports: boolean
                    compulsory: boolean
                    dataElement: {
                        displayName: string
                        id: string
                        valueType: string
                        optionSet: { id: string }
                    }
                }
            ]
        }
    ]
    programTrackedEntityAttributes: [
        {
            trackedEntityAttribute: {
                generated: boolean
                pattern: string | undefined
                displayName: string
                id: string
                valueType: string
                optionSet: { id: string, options: {value: string, label: string} }
            }
            searchable: boolean
            displayInList: boolean
            mandatory: boolean
        }
    ]
    trackedEntityType: {
        trackedEntityTypeAttributes: [
            {
                trackedEntityAttribute: {
                    id: string
                }
            }
        ]
        id: string
    }
}
