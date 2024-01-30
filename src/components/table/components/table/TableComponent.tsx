import classNames from 'classnames';
import React from 'react'
import defaultClasses from '../table.module.css';
import { TableComponentProps } from '../../../../types/common/components';

function TableComponent(props: TableComponentProps): React.ReactElement {
    const { children, className, ...passOnProps } = props;
    const classes = classNames(defaultClasses.table, className);
    return (
        <table
            className={classes}
            {...passOnProps}
        >
            {children}
        </table>
    );
}

export default TableComponent
