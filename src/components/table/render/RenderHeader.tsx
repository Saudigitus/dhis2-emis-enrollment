import React, { useMemo } from 'react'
import { RowTable } from '../components'
import classNames from 'classnames';
import { makeStyles, createStyles, type Theme } from '@material-ui/core/styles';
import { RenderHeaderProps } from '../../../types/table/TableContentProps';
import HeaderCell from '../components/head/HeaderCell';
import { Checkbox } from "@dhis2/ui"
import { RowSelectionState } from '../../../schema/tableSelectedRowsSchema';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        cell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) /
                2}px ${theme.spacing(1) * 3}px`,
            '&:last-child': {
                paddingRight: 2 * 3
            },
            borderBottomColor: "rgba(224, 224, 224, 1)"
        },
        bodyCell: {
            fontSize: theme.typography.pxToRem(13),
            color: theme.palette.text.primary
        },
        headerCell: {
            fontSize: theme.typography.pxToRem(12),
            color: theme.palette.text.secondary,
            fontWeight: 500
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1
        }
    })
);

function RenderHeader(props: RenderHeaderProps): React.ReactElement {
    const { rowsHeader, order, orderBy, createSortHandler } = props
    const classes = useStyles()
    const [selected, setSelected] = useRecoilState(RowSelectionState);

    const onToggle = (event: { checked: boolean }) => {
        const copySelectedState = { ...selected, isAllRowsSelected: event.checked, selectedRows: event.checked ? selected.rows : [] };
        setSelected(copySelectedState);
    }

    const headerCells = useMemo(() => {
        return rowsHeader?.filter(x => x.visible)?.map((column) => (
            <HeaderCell
                key={column.id}
                className={classNames(classes.cell, classes.headerCell)}
            >
                {/* TODO: the sortLabel must be optional 👇 */}
                {/* <SortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    createSortHandler={createSortHandler(column.id)}
                > */}
                {column.header}
                {/* {orderBy === column.id
                        ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        )
                        : null}
                </SortLabel> */}
            </HeaderCell>
        ))
    }, [rowsHeader]);

    return (
        <thead>
            <RowTable
                className={classes.row}
            >
                {/* <HeaderCell
                    className={classNames(classes.cell, classes.headerCell)}
                >
                    <Checkbox
                        indeterminate={selected.selectedRows.length > 0 && selected.selectedRows.length !== selected.rows.length}
                        checked={selected.isAllRowsSelected}
                        onChange={onToggle}
                        name="Ex"
                        value="checked"
                    />
                </HeaderCell> */}
                {headerCells}
            </RowTable>
        </thead>
    )
}

export default RenderHeader
