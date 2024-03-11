import React, {useState} from "react";
import {
    DataTable,
    DataTableHead,
    DataTableRow,
    DataTableBody,
    DataTableColumnHeader,
    DataTableCell
} from "@dhis2/ui"
import i18n from "@dhis2/d2-i18n";
import {ValidationReport} from "../../types/bulkImport/Interfaces";
import Pagination from "../table/components/pagination/Pagination";

interface ConflictsTableProps {
    validationReport: ValidationReport
}
export const ConflictsTable = (props: ConflictsTableProps): React.ReactElement => {
    const {validationReport} = props
    const [page, setpage] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const displayData = validationReport.errorReports.slice((page - 1) * pageSize, page * pageSize);

    const onPageChange = (newPage: number) => {
        setpage(newPage)
    }
    const onRowsPerPageChange = (event: any) => {
        setpageSize(parseInt(event.value, 10))
        setpage(1)
    }
    return (
        <>
            <DataTable>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableColumnHeader tag={"th"}>{i18n.t('Error Code')}</DataTableColumnHeader>
                        <DataTableColumnHeader tag={"th"}>{i18n.t('Tracker Type')}</DataTableColumnHeader>
                        <DataTableColumnHeader tag={"th"}>{i18n.t('UID')}</DataTableColumnHeader>
                        <DataTableColumnHeader tag={"th"}>{i18n.t('Message')}</DataTableColumnHeader>
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    {
                        displayData.map((report, index) =>{
                            return(
                                <DataTableRow
                                    key={`import-conflict-${index}`}
                                >
                                    <DataTableCell>{report.errorCode}</DataTableCell>
                                    <DataTableCell>{report.trackerType}</DataTableCell>
                                    <DataTableCell>{report.uid}</DataTableCell>
                                    <DataTableCell>{report.message}</DataTableCell>
                                </DataTableRow>
                            )
                        })
                    }
                </DataTableBody>
            </DataTable>
            <Pagination
                page={page}
                rowsPerPage={pageSize}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                loading={false} totalPerPage={displayData?.length}/>
        </>
    )
}
