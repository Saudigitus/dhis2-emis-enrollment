import React from 'react';
import { MenuItem, IconInfo24, IconList24 } from "@dhis2/ui";
import { IconButton, Menu, Divider } from '@material-ui/core';
import { RowActionsProps } from '../../../../types/table/TableContentProps';


export default function RowActions(props: RowActionsProps) {
  const { options } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () =>  setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  return (
    <>
      <IconButton  aria-controls="simple-menu" onClick={handleClick}>
        <IconList24/>
      </IconButton>
      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        { options.map((option: any, i: any) => (
          <>
            <MenuItem key={i} {...option}/>
            {option.divider === true && <Divider />}
          </>
        ))}
      </Menu>
    </>
  );
}
