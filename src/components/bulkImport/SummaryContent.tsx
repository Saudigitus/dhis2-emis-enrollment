import React, {useState} from 'react';
import {
    DataTable,
    DataTableHead,
    DataTableBody,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
} from '@dhis2/ui'
import {FieldMapping} from "../../types/bulkImport/Interfaces";
import {ErrorDetailsTable} from "./ErrorDetailsTable";

interface SummaryRowProps {
    data: any
    reference: string
    mandatoryFields: FieldMapping[]
    expandedRows: any[]
    expandedToggle: any
    showErrorsOrConflicts: boolean
    // hasConflicts?: boolean
}

export const SummaryRow = (props: SummaryRowProps): React.ReactElement => {
    const {
        data,
        reference,
        mandatoryFields,
        expandedRows,
        expandedToggle,
        showErrorsOrConflicts
    } = props
    // const rowHasErrors = data?.errors !== undefined
    // const showPaddingCell = showErrorsOrConflicts && !rowHasErrors
    return showErrorsOrConflicts
        ? (
            <DataTableRow
                expanded={expandedRows.includes(reference)}
                onExpandToggle={() => expandedToggle(`${reference}`)}
                expandableContent={<ErrorDetailsTable errors={data?.errors} data={data}/>}
            >
                {/* {showErrorsOrConflicts && <DataTableCell/>} */}
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
        : (
            <DataTableRow>
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

interface SummaryTableProps {
    displayData: Record<string, any>[]
    mandatoryFields: FieldMapping[]
    showErrorsOrConflicts: boolean
    activeTab: string
}

export const SummaryTable = (props: SummaryTableProps): React.ReactElement => {
    const {
        displayData,
        mandatoryFields,
        showErrorsOrConflicts,
        activeTab
    } = props
    const [expandedRows, setExpandedRows] = useState<string[]>([])
    const recordsName = activeTab === "new" ? "new students" : activeTab
    const expandedToggle = (rowId: string) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter((row) => row !== rowId))
        } else {
            setExpandedRows([...expandedRows, rowId])
        }
    }
    return (
        <DataTable>
            <DataTableHead>
                <DataTableRow>
                    {(showErrorsOrConflicts && ["invalids", "conflicts"].includes(activeTab))
                        && <DataTableColumnHeader/>}
                    <DataTableColumnHeader>Ref</DataTableColumnHeader>
                    <DataTableColumnHeader>School</DataTableColumnHeader>
                    <DataTableColumnHeader>Enrollment Date</DataTableColumnHeader>
                    {
                        props.mandatoryFields.map(field => (
                            <DataTableColumnHeader>{field.name}</DataTableColumnHeader>))
                    }
                </DataTableRow>
            </DataTableHead>
            <DataTableBody>
                {
                    (displayData?.length > 0) && displayData.map(student => (
                        <SummaryRow
                            key={`student-${student.ref}-${student?.trackedEntity ?? ""}`}
                            reference={`student-${student.ref}-${student?.trackedEntity ?? ""}`}
                            data={student}
                            mandatoryFields={mandatoryFields}
                            expandedRows={expandedRows}
                            expandedToggle={expandedToggle}
                            showErrorsOrConflicts={showErrorsOrConflicts}
                        />
                    ))
                }
                {(displayData?.length === 0) &&
                    <DataTableRow>
                        <DataTableCell>{`No ${recordsName} to display!`}</DataTableCell>
                    </DataTableRow>
                }
            </DataTableBody>
        </DataTable>
    )
}
