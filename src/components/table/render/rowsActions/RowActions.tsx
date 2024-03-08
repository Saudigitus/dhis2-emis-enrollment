import React, { useState } from 'react';
import { useConfig } from '@dhis2/app-runtime';
import { MenuItem, IconList24 } from "@dhis2/ui";
import { useGetEnrollmentForm, useParams } from '../../../../hooks';
import { ModalComponent, ModalUpdate } from '../../../modal';
import { IconButton, Menu, Divider } from '@material-ui/core';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';

export default function RowActions(props: RowActionsProps) {
  const { row } = props;
  const { baseUrl } = useConfig()
  const { sectionName } = useGetSectionTypeLabel();
  const handleClose = () =>  setAnchorEl(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { enrollmentsData } = useGetEnrollmentForm()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const rowsActions = ({onOpenCapture, onEditStudent}: any) : RowActionsType[] => {
      return [
          { label: "1. Go to capture", divider: false, onClick: () => { onOpenCapture() }},
          { label: "2. Edit Student", divider: false, onClick: () => { onEditStudent() }},
      ];
  } 

  const options = 
    rowsActions({
      onOpenCapture: () => window.open(`${baseUrl}/dhis-web-capture/index.html#/enrollment?enrollmentId=${row?.enrollmentId}&orgUnitId=${row?.orgUnitId}&programId=${row?.programId}&teiId=${row?.trackedEntity}`, "_blank"),
      onEditStudent: () => setOpenModal(!openModal)
  })

  return (
    <div>
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
        { options.map((option: RowActionsType, i: number) => (
          <>
            <MenuItem key={i} label={option.label} onClick={() => { option.onClick(); handleClose()}}/>
            {option.divider === true && <Divider />}
          </>
        ))}
        {
          openModal && 
            <ModalComponent 
              title={`Single ${sectionName} update`} 
              open={openModal} 
              setOpen={setOpenModal}
            >
              <ModalUpdate
                  setOpen={setOpenModal}
                  sectionName={sectionName}
                  studentInitialValues={row}
                  enrollmentsData = {enrollmentsData}
              />
          </ModalComponent>
        }
      </Menu>
    </div>
  );
}
