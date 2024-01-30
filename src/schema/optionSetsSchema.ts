import { atom } from "recoil"
import { type optionSetsSchema } from "../types/common/components"

export const OptionSetsState = atom<optionSetsSchema | undefined>({
    key: "optionSetsSchema-state",
    default: undefined
})
