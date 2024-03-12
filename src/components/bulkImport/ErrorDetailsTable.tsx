import React from 'react';
import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    DataTableHead,
    DataTableBody,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow
} from '@dhis2/ui'
import styles from './error-details-table.module.css'
import {useRecoilValue} from "recoil";
import {Headings, TemplateHeadingsState} from "../../schema/bulkImportSchema";

interface ErrorDetailsTableProps {
    data: any
    errors: Record<string, string[]>
}
export const ErrorDetailsTable = (props: ErrorDetailsTableProps): React.ReactElement => {
    const {data, errors} = props
    const headings: Headings = useRecoilValue<Headings>(TemplateHeadingsState)
    return (
        <>
            <DataTable>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableCell colSpan="3" error>
                            {i18n.t("Errors")}
                        </DataTableCell>
                    </DataTableRow>
                    <DataTableRow>
                        <DataTableColumnHeader tag={"th"}>{i18n.t('Field')}</DataTableColumnHeader>
                        <DataTableColumnHeader>{i18n.t('Value')}</DataTableColumnHeader>
                        <DataTableColumnHeader>{i18n.t('Error Message')}</DataTableColumnHeader>
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    {
                        Object.entries(errors).map(([key, value]) => {
                            return (
                                <DataTableRow key={key}>
                                    <DataTableCell>{headings[key]}</DataTableCell>
                                    <DataTableCell error>{data[key]}</DataTableCell>
                                    <DataTableCell>{value.join(", ")}</DataTableCell>
                                </DataTableRow>)
                        })
                    }
                </DataTableBody>
            </DataTable>
        </>
    )
}
