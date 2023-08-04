import React from 'react'
import { TableSortLabel } from '@material-ui/core';

interface TableSortProps {
    children?: React.ReactNode
    active: boolean
    direction?: string
    createSortHandler: (rowsPerPage: string) => void
}

function SortLabel(props: TableSortProps) {
    console.log(props);
    return (
        <TableSortLabel
            active={props.active}
            direction={props.direction}
            onClick={(page: any, e: any) => { props?.createSortHandler(page) }}
        >
            {props.children}
        </TableSortLabel>
    )
}

export default SortLabel
