import { atom } from "recoil"
import { type dataStoreRecord } from "../types/common/components"

export const DataStoreState = atom<dataStoreRecord[]>({
    key: "dataStore-get-state",
    default: []
})
