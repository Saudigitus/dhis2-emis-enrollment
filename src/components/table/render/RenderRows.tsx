import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { RowCell, RowTable } from '../components';
import { getDisplayName } from '../../../utils/table/rows/getDisplayNameByOption';
import { type CustomAttributeProps } from '../../../types/table/AttributeColumns';

interface RenderHeaderProps {
    rowsData: any[]
    headerData: CustomAttributeProps[]
}

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

function RenderRows({ headerData, rowsData }: RenderHeaderProps): React.ReactElement {
    const classes = useStyles()

    if (rowsData.length === 0) {
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
                rowsData.map((row, index) => {
                    const cells = headerData?.filter(x => x.visible)?.map(column => (
                        <RowCell
                            key={column.id}
                            className={classNames(classes.cell, classes.bodyCell)}
                        >
                            <div>
                                {getDisplayName({ attribute: column.id, headers: headerData, value: row[column.id] })}
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
