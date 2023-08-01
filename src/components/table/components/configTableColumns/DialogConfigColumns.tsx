import i18n from '@dhis2/d2-i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react'
import DragDropList from '../../../dragDrop/DragDropList';
import { Button } from 'react-bootstrap';
import { type CustomAttributeProps } from '../../../../types/table/AttributeColumns';

interface DialogSelectColumnsProps {
    open: boolean
    onClose: () => void
    headers: any[]
    updateVariables: (list: any[]) => void
}

function DialogSelectColumns(props: DialogSelectColumnsProps) {
    const { open, onClose, headers = [], updateVariables } = props

    const [columnsList, setcolumnsList] = useState<CustomAttributeProps[]>([])

    function handleToggle(id: string) {
        const localColumns = columnsList?.length > 0 ? [...columnsList] : [...headers] as CustomAttributeProps[]

        const index = localColumns.findIndex(column => column.id === id);

        localColumns[index] = { ...localColumns[index], visible: !(localColumns[index].visible) };

        setcolumnsList(localColumns)
    };

    const handleSave = () => {
        updateVariables(columnsList.length > 0 ? columnsList : headers)

        onClose()
    };

    const handleUpdateListOrder = (sortedList: CustomAttributeProps[]) => {
        setcolumnsList(sortedList)
    };

    return (
        <>
            <Dialog
                open={!!open}
                onClose={onClose}
                fullWidth
            >
                <DialogTitle>{i18n.t('Columns to show in the table')}</DialogTitle>
                <DialogContent>
                    <DragDropList
                        listItems={columnsList.length > 0 ? columnsList : headers}
                        handleUpdateListOrder={handleUpdateListOrder}
                        handleToggle={handleToggle}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleSave}>
                        {i18n.t('Save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogSelectColumns
