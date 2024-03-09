import { atom } from "recoil"
import { type CustomAttributeProps } from "../types/variables/AttributeColumns";

export const EventsState = atom<any[]>({
    key: "tevents-state",
    default: []
})
