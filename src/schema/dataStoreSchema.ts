import { atom } from "recoil"
import { z } from "zod"

const dataStoreRecord = z.record(
    z.string(),
    z.object({
        program: z.string(),
        programStage: z.string()
    })
)

export const dataStoreSchema = z.object({
    enrollment: dataStoreRecord,
    class: z.string(),
    grade: z.string(),
    academicYear: z.string()
})

type DataStoreSchema = z.infer<typeof dataStoreSchema>

export const DataStoreState = atom<DataStoreSchema | undefined>({
    key: "dataStore-get-state",
    default: undefined
})
