import classNames from 'classnames';
import React from 'react'
import Tooltip from "@material-ui/core/Tooltip";
import defaultClasses from '../table.module.css';
import { RowProps } from '../../../../types/table/TableContentProps';
import useGetSectionTypeLabel from "../../../../hooks/commons/useGetSectionTypeLabel";

function RowTable(props: RowProps): React.ReactElement {
    const { children, className, table, inactive = false, isOwnershipOu = true, ...passOnProps } = props;
    const { sectionName } = useGetSectionTypeLabel()

    const classes = classNames(
        defaultClasses.tableRow,
        {
            [defaultClasses.tableRowBody]: table == null,
            [defaultClasses.tableRowHeader]: table?.head,
            [defaultClasses.tableRowFooter]: table?.footer
        },
        className,
        inactive && defaultClasses.disabledRow
    );

    return (
        <Tooltip arrow={true} /* disableHoverListener={!inactive || !isOwnershipOu} */ disableFocusListener
            title={!isOwnershipOu ? 'This ' + sectionName + ' was transferred to another school' : inactive ? 'This ' + sectionName + ' enrollment is inactive' : ""}>
            <tr
                className={classes}
                {...passOnProps}
            >
                {children}
            </tr>
        </Tooltip>
    )
}

export default RowTable
