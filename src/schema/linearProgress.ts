import { atom } from "recoil"

export const ProgressState = atom<any>({
    key: "progress-state",
    default: { progress: null }
})
