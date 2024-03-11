import React, { useState } from 'react';
import { IconEdit24 } from "@dhis2/ui";
import style from './rowActions.module.css'
import { IconButton,  Tooltip } from '@material-ui/core';
import { useGetEnrollmentForm  } from '../../../../hooks';
import { ModalComponent, ModalContentUpdate } from '../../../modal';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';

export default function RowActions(props: RowActionsProps) {
  const { row } = props;
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm()
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const rowsActions = ({onEditStudent} : any) : RowActionsType[] => {
      return [
          { label: "Edition", onClick: () => { onEditStudent() }, icon: <IconEdit24/>},
      ];
  } 

  const options =  rowsActions({ onEditStudent: () => setOpenModal(!openModal)})

  return (
    <div className={style.rowActionsContainer}>
      { options.map((option: RowActionsType, i: number) => (
          <Tooltip 
            key={i} 
            title={option.label}
             onClick={() => { option.onClick() }}>
            <IconButton className={style.rowActionsIcon}>{option.icon}</IconButton>
          </Tooltip>
      ))}
      {
        openModal && 
          <ModalComponent 
            title={`Single ${sectionName} Edition`} 
            open={openModal} 
            setOpen={setOpenModal}
          >
            <ModalContentUpdate
                setOpen={setOpenModal}
                sectionName={sectionName}
                studentInitialValues={row}
                enrollmentsData = {enrollmentsData}
            />
        </ModalComponent>
      }
    </div>
  );
}
