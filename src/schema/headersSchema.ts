import { atom } from "recoil"
import { z } from "zod"

export const headersFieldsSchema = z.object({
    dataElements: z.array(z.any()),
    attributes: z.array(z.any())
})

type HeaderFieldsSchema = z.infer<typeof headersFieldsSchema>

export const HeaderFieldsState = atom<HeaderFieldsSchema | undefined>({
    key: "headerFieldsState-get-state",
    default: undefined
})
