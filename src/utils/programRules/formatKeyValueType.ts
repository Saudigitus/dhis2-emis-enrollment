export function formatKeyValueType(sections: any[]) {
    const keys: any = {}
    for (const iterator of sections) {
        for (const variable of iterator) {
            keys[variable.name] = variable.valueType
        }
    }
    return keys
}


export function formatKeyValueTypeHeader(variables: any[]) {
    const keys: any = {}
    for (const variable of variables) {
        keys[variable.id] = variable.valueType
    }
    return keys
}
