import { atom } from "recoil"
import { optionSetsSchema } from "../types/common/components"

export const OptionSetsState = atom<optionSetsSchema | undefined>({
    key: "optionSetsSchema-state",
    default: undefined
})
