import { atom } from "recoil"
import { OptionSetsSchema } from "../types/optionSet/OptionSetConfig"

export const OptionSetsState = atom<OptionSetsSchema | undefined>({
    key: "optionSetsSchema-state",
    default: undefined
})
