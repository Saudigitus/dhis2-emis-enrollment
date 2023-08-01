import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { type CustomAttributeProps } from '../../../../../types/table/AttributeColumns';

interface MenuFiltersProps {
    anchorEl: any
    setAnchorEl: (value: any) => void
    addSearchableHeaders: (value: any) => void
    options: CustomAttributeProps[]
}

export default function MenuFilters({ anchorEl, setAnchorEl, addSearchableHeaders, options }: MenuFiltersProps) {
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {options?.map((option, i) =>
                    <MenuItem key={i} onClick={(e) => { addSearchableHeaders(option); setAnchorEl(null) }}>{option.header}</MenuItem>
                )}
            </Menu>
        </>
    );
}
