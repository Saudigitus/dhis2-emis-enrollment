import React, {useState} from 'react'
import {
    DataTable,
    DataTableRow,
    DataTableHead,
    DataTableBody,
    DataTableCell,
    DataTableColumnHeader
} from '@dhis2/ui'
import {ApiResponse, Stats, ValidationReport} from "../../types/bulkImport/Interfaces";
import {ConflictsTable} from "./ConflictsTable";

interface ImportSummaryRowProps {
    status: string
    reference: string
    importSummary: Stats
    conflicts: number
    hasConflicts: boolean
    expandedRows: any[]
    expandedToggle: any
    validationReport: ValidationReport
}
export const ImportSummaryRow = (props: ImportSummaryRowProps): React.ReactElement => {
    const {status, reference, importSummary, conflicts, hasConflicts, expandedRows, expandedToggle, validationReport} = props
    return hasConflicts ? (
        <DataTableRow
            expanded = {expandedRows.includes(reference)}
            onExpandToggle={() => expandedToggle(`${reference}`)}
            expandableContent={<ConflictsTable validationReport={validationReport}/>}
        >
            <DataTableCell>{status}</DataTableCell>
            <DataTableCell>{importSummary?.created}</DataTableCell>
            <DataTableCell >{importSummary?.updated}</DataTableCell>
            <DataTableCell>{importSummary?.ignored}</DataTableCell>
            <DataTableCell>{conflicts}</DataTableCell>
        </DataTableRow>
    ) : (
        <DataTableRow>
            <DataTableCell>{status}</DataTableCell>
            <DataTableCell>{importSummary?.created}</DataTableCell>
            <DataTableCell >{importSummary?.updated}</DataTableCell>
            <DataTableCell>{importSummary?.ignored}</DataTableCell>
            <DataTableCell>{conflicts}</DataTableCell>
        </DataTableRow>
    )
}

export const ImportSummaryTable = (response: ApiResponse) => {
    const {status, stats, validationReport, bundleReport} = response
    const hasConflicts = validationReport?.errorReports.length > 0
    const [expandedRows, setExpandedRows] = useState<string[]>([])

    const expandedToggle = (rowId: string) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter((row) => row !== rowId))
        } else {
            setExpandedRows([...expandedRows, rowId])
        }
    }
    return(
        <>
            <DataTable>
                <DataTableHead>
                    <DataTableRow>
                        { hasConflicts && <DataTableColumnHeader/>}
                        <DataTableColumnHeader>Status</DataTableColumnHeader>
                        <DataTableColumnHeader>Imported</DataTableColumnHeader>
                        <DataTableColumnHeader>Updated</DataTableColumnHeader>
                        <DataTableColumnHeader>Ignored</DataTableColumnHeader>
                        <DataTableColumnHeader>Conflicts</DataTableColumnHeader>
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    <ImportSummaryRow
                        status={status}
                        reference={`import-summary`}
                        importSummary={stats}
                        conflicts={0}
                        hasConflicts={hasConflicts}
                        expandedRows={expandedRows}
                        expandedToggle={expandedToggle}
                        validationReport={validationReport}
                    />
                </DataTableBody>
            </DataTable>
        </>
    )
}
