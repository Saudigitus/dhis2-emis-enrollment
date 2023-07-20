
export const disableNextPage = ({ totalPerPage, rowsPerPage }:
    { totalPerPage: number, rowsPerPage: number }): boolean => {
    if (totalPerPage < rowsPerPage) {
        return true
    }
    return false
}
