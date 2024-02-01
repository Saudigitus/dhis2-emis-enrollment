import { atom } from "recoil"
import { headersFieldsSchema } from "../types/common/components"

export const HeaderFieldsState = atom<headersFieldsSchema>({
    key: "headerFieldsState-get-state",
    default: {
        dataElements: [],
        attributes: []
    }
})
