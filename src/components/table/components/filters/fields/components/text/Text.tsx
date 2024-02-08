import { TextField } from '@material-ui/core';
import React from 'react'
import { TextFilterProps } from '../../../../../../../types/table/ContentFiltersProps';

function TextFilter(props: TextFilterProps) {
    const { value, onChange, id } = props;

    return (
        <div>
            <TextField
                value={value}
                onChange={(e: any) => {
                    onChange(e.target.value, id)
                }}
                placeholder={"Digitar texto"}
            />
        </div>
    )
}

export default TextFilter
