import {
    DataTableRow,
    DataTableCell
} from '@dhis2/ui'
import {Field} from "../../types/generated";
import {FieldMapping} from "../../types/bulkImport/Interfaces";
interface SummaryRowProps {
    data: any
    mandatoryFields: FieldMapping[]
    expandedRows: any
    expandedToggle: any
    hasErrors: boolean
    hasConflicts?: boolean
}
export const SummaryRow = (props: SummaryRowProps) => {
    const {data, mandatoryFields, expandedRows, expandedToggle, hasErrors, hasConflicts} = props
    const rowHasErrors = data?.errors.length > 0
    const showPaddingCell = hasErrors && !rowHasErrors
    return (
        <DataTableRow>
            {showPaddingCell && <DataTableCell/>}
            <DataTableCell>{data?.ref}</DataTableCell>
            <DataTableCell>{data?.orgUnitName}</DataTableCell>
            <DataTableCell>{data?.enrollmentDate}</DataTableCell>
            {
                mandatoryFields.map(field => (
                    <DataTableCell>{data[field.key]}</DataTableCell>)
                )
            }
        </DataTableRow>
    )

}
export const SummaryTable = () => {

}
