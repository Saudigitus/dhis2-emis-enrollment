import classNames from 'classnames';
import React from 'react'
import defaultClasses from '../table.module.css';

interface TableComponentProps {
    children?: React.ReactNode
    className?: string
}

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
