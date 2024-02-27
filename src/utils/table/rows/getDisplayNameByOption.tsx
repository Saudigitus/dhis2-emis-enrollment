import { defaultProps } from "../../../types/utils/FormatRowsDataProps";

export function getDisplayName({ attribute, value, headers }: defaultProps): string {
    if (headers.length > 0) {
        for (const iterator of headers) {
            if (iterator.id === attribute && typeof iterator?.options?.optionSet !== 'undefined') {
                for (const op of iterator?.options?.optionSet?.options || []) {
                    if (op.value === value) return op.label
                }
            }
        }
    }
    return value
}
