import { atom } from "recoil"
import { type headersFieldsSchema } from "../types/common/components"

export const HeaderFieldsState = atom<headersFieldsSchema>({
    key: "headerFieldsState-get-state",
    default: {
        dataElements: [],
        attributes: []
    }
})
