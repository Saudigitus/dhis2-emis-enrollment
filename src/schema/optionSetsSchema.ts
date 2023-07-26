import { atom } from "recoil"
import { z } from "zod"

export const optionSetsSchema = z.record(
    z.string(),
    z.object({
        name: z.string(),
        id: z.string(),
        displayName: z.string(),
        options: z.array(
            z.object(
                {
                    code: z.string(),
                    name: z.string(),
                    id: z.string(),
                    displayName: z.string()
                }
            )
        )
    })
)

type OptionSetsSchema = z.infer<typeof optionSetsSchema>

export const OptionSetsState = atom<OptionSetsSchema | undefined>({
    key: "optionSetsSchema-state",
    default: undefined
})
