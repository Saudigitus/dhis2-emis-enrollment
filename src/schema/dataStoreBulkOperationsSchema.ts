import { atom } from "recoil"
import { dataStoreBulkRecord } from "../types/dataStore/DataStoreBulkOperationsConfig"

export const DataStoreBulkOperationsState = atom<dataStoreBulkRecord>({
    key: "dataStoreBulkOperations-get-state",
    default: {
        importTemplates: [{
            id: "",
            module: "enrollment"
        }]
    }
})
