import { atom } from "recoil"

interface attendance {
    absenceReason: string
    programStage: string
    status: string
    statusOptions: [{
        code: string
        icon: string
        key: string
    }]
}

interface programStages {
    programStage: string
}

interface performance {
    programStages: programStages[]
}

interface registration {
    academicYear: string
    position: string
    programStage: string
    employmentType: string
}

interface transfer {
    destinySchool: string
    programStage: string
    status: string
}

export interface dataStoreRecord {
    attendance: attendance
    key: string
    lastUpdate: string
    performance: performance
    program: string
    registration: registration
    ["socio-economics"]: programStages
    transfer: transfer

}

export const DataStoreState = atom<dataStoreRecord[]>({
    key: "dataStore-get-state",
    default: []
})
