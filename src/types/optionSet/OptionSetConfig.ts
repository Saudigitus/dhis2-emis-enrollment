interface OptionSetsSchema {
    name: string,
    id: string,
    displayName: string,
    options: {
        code: string,
        name: string,
        id: string,
        displayName: string
    }[]
}

export type { OptionSetsSchema }