import { atom } from "recoil"
import { dataStoreRecord } from "../types/dataStore/DataStoreConfig"

export const DataStoreState = atom<dataStoreRecord[]>({
    key: "dataStore-get-state",
    default: []
})
