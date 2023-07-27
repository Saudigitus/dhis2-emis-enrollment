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
                        optionSet: any
                    }
                }
            ]
        }
    ]
    programTrackedEntityAttributes: [
        {
            trackedEntityAttribute: {
                displayName: string
                id: string
                valueType: string
                optionSet: any
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
