import { atom } from "recoil"
import { type CustomAttributeProps } from "../types/variables/AttributeColumns";

export const TableColumnState = atom<CustomAttributeProps[]>({
    key: "table-column-state",
    default: []
})
