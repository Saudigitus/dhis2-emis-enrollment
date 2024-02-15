export interface QueryParams {
    program: string
    pageSize: number
    ouMode: string
    filter?: string[]
    orgUnit: string
    order: string
}


export interface SearchOu {
    id: string,
    displayName: string,
    path: string,
    publicAccess: object,
    access: object,
    lastUpdated: string,
    children: object[]
}