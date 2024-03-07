import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { useConfig } from '@dhis2/app-runtime';
import { RowCell, RowTable } from '../components';
import RowActions from './rowsActions/RowActions';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { getDisplayName } from '../../../utils/table/rows/getDisplayNameByOption';
import { RenderHeaderProps, RowActionsType } from '../../../types/table/TableContentProps';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        dataRow: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#F1FBFF'
            }
        },
        cell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) /
                2}px ${theme.spacing(1) * 3}px`,
            '&:last-child': {
                paddingRight: theme.spacing(1) * 3
            },
            borderBottomColor: "rgba(224, 224, 224, 1)"
        },
        bodyCell: {
            fontSize: theme.typography.pxToRem(13),
            color: theme.palette.text.primary
        }
    })
);

function RenderRows(props: RenderHeaderProps): React.ReactElement {
    const classes = useStyles()
    const { baseUrl } = useConfig()
    const { headerData, rowsData } = props;

    const rowsActions = ({onOpenCapture, onEditStudent}: any) : RowActionsType[] => {
        return [
            { label: "1. Go to capture", divider: false, onClick: () => { onOpenCapture() }},
            { label: "2. Edit Student", divider: false, onClick: () => { onEditStudent() }},
        ];
    } 

    if (rowsData?.length === 0) {
        return (
            <RowTable
                className={classes.row}
            >
                <RowCell
                    className={classNames(classes.cell, classes.bodyCell)}
                    colspan={headerData?.filter(x => x.visible)?.length}
                >
                    {i18n.t('No data to display')}
                </RowCell>
            </RowTable>
        );
    }

    return (
        <React.Fragment>
            {
                rowsData?.map((row, index) => {
                    const cells = headerData?.filter(x => x.visible)?.map(column => (
                        <RowCell
                            key={column.id}
                            className={classNames(classes.cell, classes.bodyCell)}
                        >
                            <div>
                                {getDisplayName({ attribute: column.id, headers: headerData, value: row[column.id] })}
                                {
                                    (column.displayName == "Actions") ?
                                        <RowActions 
                                            options={
                                              rowsActions({
                                                onOpenCapture: () => window.open(`${baseUrl}/dhis-web-capture/index.html#/enrollment?enrollmentId=${row?.enrollmentId}&orgUnitId=${row?.orgUnitId}&programId=${row?.programId}&teiId=${row?.trackedEntity}`, "_blank"),
                                                onEditStudent: () => console.log(0)
                                            })}
                                        />
                                    : null
                                }
                            </div>
                        </RowCell>
                    ));
                    return (
                        <RowTable
                            key={index}
                            className={classNames(classes.row, classes.dataRow)}
                        >
                            {cells}
                        </RowTable>
                    );
                })
            }
        </React.Fragment>
    )
}

export default RenderRows
