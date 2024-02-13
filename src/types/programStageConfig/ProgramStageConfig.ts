import { OptionsProps } from "../variables/AttributeColumns"

interface ProgramStageConfig {
    autoGenerateEvent: boolean
    displayName: string
    id: string
    executionDateLabel?: string
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
                    options: OptionsProps[]
                }
            }
        }
    ]
}

export type { ProgramStageConfig }