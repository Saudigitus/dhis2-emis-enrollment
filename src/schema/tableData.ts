import { atom } from "recoil"
import { z } from "zod"

export const tableDataSchema = z.object({
   
})

type TableDataSchema = z.infer<typeof tableDataSchema>

export const TableDataState = atom<TableDataSchema | undefined>({
    key: "programConfig-get-state",
    default: undefined
})
