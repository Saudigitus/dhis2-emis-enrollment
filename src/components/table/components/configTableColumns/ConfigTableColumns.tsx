import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n';
import { IconSettings24 } from '@dhis2/ui';
import { IconButton, Tooltip } from '@material-ui/core';
import DialogConfigColumns from './DialogConfigColumns';

interface ConfigTableColumnsProps {
    headers: any[]
    updateVariables: (list: any[]) => void
}

function ConfigTableColumns(props: ConfigTableColumnsProps) {
    const { headers, updateVariables } = props;
    const [open, setopen] = useState(false)

    const closeDialog = () => {
        setopen(false)
    }

    const openDialog = () => {
        setopen(true)
    }

    // const handleSaveColumns = (columns) => {
    //     // this.props.onSave(columns);
    //     closeDialog();
    // }

    return (
        <React.Fragment>
            <Tooltip
                disableFocusListener
                disableTouchListener
                enterDelay={500}
                title={i18n.t('Select columns')}
                className="my-auto"
            >
                <IconButton
                    onClick={openDialog}
                >
                    <IconSettings24 />
                </IconButton>
            </Tooltip>
            <DialogConfigColumns
                open={open}
                onClose={closeDialog}
                // onSave={handleSaveColumns}
                updateVariables={updateVariables}
                headers={headers}
            />
        </React.Fragment>
    )
}

export default ConfigTableColumns
