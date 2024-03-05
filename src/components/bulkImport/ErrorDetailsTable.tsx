import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'
import styles from './error-details-table.module.css'
import {useRecoilValue} from "recoil";
import {Headings, TemplateHeadingsState} from "../../schema/bulkImportSchema";
export const ErrorDetailsTable = (errors: Record<string, string[]>) => {
    const headings: Headings = useRecoilValue<Headings>(TemplateHeadingsState)
    return (
        <>
            <span className={styles.label}>{i18n.t('Errors')}</span>
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>{i18n.t('Field')}</TableCellHead>
                        <TableCellHead>{i18n.t('Error Message')}</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {
                        Object.entries(errors).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell>{headings[key]}</TableCell>
                                <TableCell>{value.join(', ')}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
