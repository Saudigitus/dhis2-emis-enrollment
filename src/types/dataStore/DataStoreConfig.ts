
interface attendance {
    absenceReason: string
    programStage: string
    status: string
    statusOptions: [{
        code: string
        icon: string
    }]
}

interface simpleProgramStage {
    programStage: string
}

interface performance {
    programStages: simpleProgramStage[]
}

interface registration {
    academicYear: string
    grade: string
    programStage: string
    section: string
}

interface transfer {
    destinySchool: string
    programStage: string
    status: string
}

interface dataStoreRecord {
    attendance: attendance
    key: string
    trackedEntityType: string
    lastUpdate: string
    performance: performance
    program: string
    registration: registration
    ["socio-economics"]: simpleProgramStage
    transfer: transfer
    ["final-result"]: simpleProgramStage

}

export type { dataStoreRecord, transfer, registration, performance, attendance, simpleProgramStage}