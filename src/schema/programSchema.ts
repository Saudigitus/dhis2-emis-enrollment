import { atom } from "recoil"
import { z } from "zod"

export const programSchema = z.object({
    displayName: z.string(),
    id: z.string(),
    description: z.string(),
    access: z.object({}),
    programType: z.string(),
    programStages: z.array(
        z.object({
            autoGenerateEvent: z.boolean(),
            displayName: z.string(),
            id: z.string(),
            programStageDataElements: z.array(
                z.object({
                    dataElement: z.object({
                        displayName: z.string(),
                        id: z.string()
                    })
                })
            )
        })
    ),
    programTrackedEntityAttributes: z.array(
        z.object({
            trackedEntityAttribute: z.object({
                displayName: z.string(),
                id: z.string(),
                valueType: z.string(),
                optionSet: z.any({})
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

type ProgramSchemaConfig = z.infer<typeof programSchema>

export const ProgramConfigState = atom<ProgramSchemaConfig | undefined>({
    key: "programConfig-get-state",
    default: undefined
})
