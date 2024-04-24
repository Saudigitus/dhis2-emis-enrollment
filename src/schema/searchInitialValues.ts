import { atom } from "recoil";

export const SearchInitialValues = atom<Record<string, any>>({
    key: "search-initial-values",
    default: {}
})