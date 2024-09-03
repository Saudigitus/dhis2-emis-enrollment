import {atom} from "recoil";

export const TableDataLengthState = atom<number>({
    key: "table-data-length",
    default: 0
})
