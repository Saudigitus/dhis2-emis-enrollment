import { z } from "zod"

export const programSchema = z.object({
    id: z.string({ description: "The id of the program" }),
    displayName: z.string(),
    description: z.string()
})

export type ProgramSchemaConfig = z.infer<typeof programSchema>
