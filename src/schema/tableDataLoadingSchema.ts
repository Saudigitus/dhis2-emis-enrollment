import { atom } from "recoil";

export const TableDataLoadingState = atom<boolean>({
    key: "table-data-loading",
    default: false
})
