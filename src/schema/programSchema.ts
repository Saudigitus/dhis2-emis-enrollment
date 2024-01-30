import { atom } from "recoil"
import { ProgramConfig } from "../types/common/components"

export const ProgramConfigState = atom<ProgramConfig>({
    key: "programConfig-get-state",
    default: undefined
})
