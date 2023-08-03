/**
 * Our backend returns certain values as a number, but our
 * inputs expect and return a string, so we're formatting them to strings
 */

 export const formatToString = (value: any) => {
    if (typeof value === 'number') {
        return value.toString()
    }

    return value
}
