import { atom } from "recoil"
import { type ProgramConfig } from "../types/programConfig/ProgramConfig"

export const ProgramConfigState = atom<ProgramConfig | undefined>({
    key: "programConfig-get-state",
    default: undefined
})
