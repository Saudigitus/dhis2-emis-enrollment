import { atom } from "recoil"
import { GlobalFiltersSchema } from "../types/headBar/GlobalFilters"

export const HeaderFieldsState = atom<GlobalFiltersSchema>({
    key: "headerFieldsState-get-state",
    default: {
        dataElements: [],
        attributes: []
    }
})
