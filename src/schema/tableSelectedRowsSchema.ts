import { atom } from 'recoil';
import { z } from 'zod';

export const selectionSchema = z.object({
    isAllRowsSelected: z.boolean(),
    selectedRows: z.array(z.object({})),
    rows: z.array(z.object({}))
})

export type SelectionSchemaConfig = z.infer<typeof selectionSchema>

export const RowSelectionState = atom<SelectionSchemaConfig>({
    key: "get-selection-rows",
    default: {
        isAllRowsSelected: false,
        selectedRows: [],
        rows: []
    }
})
