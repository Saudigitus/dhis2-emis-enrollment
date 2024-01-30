import classNames from 'classnames';
import React from 'react'
import defaultClasses from '../table.module.css';
import { RowProps } from '../../../../types/common/components';


function RowTable(props: RowProps): React.ReactElement {
    const { children, className, table, ...passOnProps } = props;

    const classes = classNames(
        defaultClasses.tableRow,
        {
            [defaultClasses.tableRowBody]: table == null,
            [defaultClasses.tableRowHeader]: table?.head,
            [defaultClasses.tableRowFooter]: table?.footer
        },
        className
    );

    return (
        <tr
            className={classes}
            {...passOnProps}
        >
            {children}
        </tr>
    )
}

export default RowTable
