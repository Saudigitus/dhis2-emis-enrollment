import { atom } from "recoil";

export const TeiRefetch = atom<boolean>({
    key: "refetch-tei",
    default: false
})