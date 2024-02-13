import { Checkbox, IconReorder24 } from '@dhis2/ui';
import TableCell from '@material-ui/core/TableCell';
import React from 'react'
import styles from './DragDropItems.module.css'
import { DragDropItemsProps } from '../../types/table/ConfigColumnsProps';

function DragDropItems(props: DragDropItemsProps) {
    const { handleToggle, id, text } = props;

    return (
        <tr key={props.id} tabIndex={-1} className={styles.tr} >
            <TableCell component="th" scope="row">
                <Checkbox
                    checked={props.visible}
                    tabIndex={-1}
                    onChange={() => { handleToggle(id); }}
                    label={text}
                    valid dense />
            </TableCell>
            <TableCell>
                <span className={styles.iconContainer} >
                    <IconReorder24 />
                </span>
            </TableCell>
        </tr>
    )
}

export default DragDropItems
