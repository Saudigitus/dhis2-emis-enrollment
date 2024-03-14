import React from 'react'
import i18n from '@dhis2/d2-i18n';
import classNames from 'classnames';
import { RowCell, RowTable } from '../components';
import RowActions from './rowsActions/RowActions';
import { RenderHeaderProps } from '../../../types/table/TableContentProps';
import { RowSelectionState } from '../../../schema/tableSelectedRowsSchema';
import { useRecoilState } from 'recoil';
import { checkIsRowSelected } from '../../../utils/commons/arrayUtils';
import CropOriginal from '@material-ui/icons/CropOriginal';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import { getDisplayName } from '../../../utils/table/rows/getDisplayNameByOption';
import { formatKeyValueTypeHeader } from '../../../utils/programRules/formatKeyValueType';
import { Attribute } from '../../../types/generated/models';
import { GetImageUrl } from '../../../utils/table/rows/getImageUrl';
import { IconButton } from '@material-ui/core';

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
    const { imageUrl } = GetImageUrl()
    const [selected, setSelected] = useRecoilState(RowSelectionState);

    const onToggle = (rawRowData: object) => {
        setSelected({ ...selected, selectedRows: checkIsRowSelected({ rawRowData: rawRowData, selected: selected }), isAllRowsSelected: (selected.rows.length > 0 && selected.rows.length === checkIsRowSelected({ rawRowData: rawRowData, selected: selected }).length) })
    }
    const { headerData, rowsData } = props;

    if (rowsData?.length === 0) {
        return (
            <RowTable
                className={classes.row}
            >
                <RowCell
                    className={classNames(classes.cell, classes.bodyCell)}
                    colspan={headerData?.filter(x => x.visible)?.length + 1}
                >
                    {i18n.t('No data to display')}
                </RowCell>
            </RowTable>
        );
    }

    return (
        <React.Fragment>
            {
                rowsData.map((row, index) => (
                    <RowTable
                        key={index}
                        className={classNames(classes.row, classes.dataRow)}
                    >
                        {/* 
                        <RowCell
                            className={classNames(classes.cell, classes.bodyCell)}
                        >
                            <div onClick={(event) => { event.stopPropagation(); }}>
                                <Checkbox
                                    checked={selected.isAllRowsSelected || selected.selectedRows.filter((element: any) => element?.trackedEntity === row.trackedEntity).length > 0}
                                    name="Ex"
                                    onChange={() => { onToggle(row); }}
                                    value="checked"
                                />

                            </div>
                        </RowCell> 
                        */}

                        {
                            headerData?.filter(x => x.visible)?.map(column => (
                                <RowCell
                                    key={column.id}
                                    className={classNames(classes.cell, classes.bodyCell)}
                                >
                                    <div>
                                        {
                                            formatKeyValueTypeHeader(headerData)[column.id] === Attribute.valueType.IMAGE ?
                                                <a href={imageUrl({ attribute: column.id, trackedEntity: row.trackedEntity })} target='_blank'>{row[column.id] && <IconButton> <CropOriginal /></IconButton>}</a>
                                                :
                                                getDisplayName({ attribute: column.id, headers: headerData, value: row[column.id] })
                                        }
                                        {
                                            (column.displayName == "Actions") ?
                                                <RowActions row={row} />
                                                : null
                                        }
                                    </div>
                                </RowCell>
                            ))
                        }
                    </RowTable>
                ))
            }
        </React.Fragment>
    )
}

export default RenderRows
