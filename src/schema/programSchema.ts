import { atom } from "recoil"
import { z } from "zod"
import { type ProgramConfig } from "../types/programConfig/ProgramConfig"

export const programSchema = z.object({
    displayName: z.string(),
    id: z.string(),
    description: z.string(),
    access: z.any().optional(),
    programType: z.string(),
    programStages: z.array(
        z.object({
            autoGenerateEvent: z.boolean(),
            displayName: z.string(),
            id: z.string(),
            programStageDataElements: z.array(
                z.object({
                    displayInReports: z.boolean(),
                    compulsory: z.boolean(),
                    dataElement: z.object({
                        displayName: z.string(),
                        id: z.string(),
                        valueType: z.string(),
                        optionSet: z.object({
                            id: z.string(),
                            options: z.object({
                                value: z.string(),
                                label: z.string()
                            })
                        })
                    })
                })
            )
        })
    ),
    programTrackedEntityAttributes: z.array(
        z.object({
            trackedEntityAttribute: z.object({
                generated: z.boolean(),
                pattern: z.string().optional(),
                displayName: z.string(),
                id: z.string(),
                valueType: z.string(),
                optionSet: z.object({
                    id: z.string(),
                    options: z.object({
                        value: z.string(),
                        label: z.string()
                    })
                })
            }),
            searchable: z.boolean(),
            displayInList: z.boolean(),
            mandatory: z.boolean()
        })
    ),
    trackedEntityType: z.object({
        trackedEntityTypeAttributes: z.array(z.object(
            {
                trackedEntityAttribute: z.object({
                    id: z.string()
                })
            }
        )),
        id: z.string()
    })
})

// type ProgramSchemaConfig = z.infer<typeof programSchema>

export const ProgramConfigState = atom<ProgramConfig>({
    key: "programConfig-get-state",
    default: undefined
})
