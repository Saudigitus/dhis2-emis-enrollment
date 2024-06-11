interface TeiQueryProps {
    program: string
    pageSize?: number
    ouMode?: string
    trackedEntity: string
    orgUnit?: string
    order?: string
}

interface TeiSearchQueryProps {
    program: string
    page?: number
    pageSize?: number
    ouMode?: string
    orgUnit?: string
    order?: string
    filter?: string
}

interface attributesProps {
    attribute: string
    value: string
}

interface TeiQueryResults {
    results: {
        instances: [{
            trackedEntity: string
            attributes: attributesProps[]
            enrollments: [{
                enrollment: string
                orgUnit: string
                program: string
            }]
            programOwners: [{
                orgUnit: string
            }]
        }]
    }
}

export enum EnrollmentStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export type { TeiQueryProps, TeiSearchQueryProps, TeiQueryResults, attributesProps }