import React, { useState, useEffect } from 'react';
import { IconEdit24 } from "@dhis2/ui";
import style from './rowActions.module.css'
import { IconButton,  Tooltip } from '@material-ui/core';
import { useGetEnrollmentForm  } from '../../../../hooks';
import { ModalComponent, ModalContentUpdate } from '../../../modal';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';
import useGetEnrollmentUpdateFormData from '../../../../hooks/form/useGetEnrollmentUpdateFormData';

export default function RowActions(props: RowActionsProps) {
  const { trackedEntity } = props;
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm()
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { formIntialValues, loading } = useGetEnrollmentUpdateFormData (trackedEntity, openModal)

  const rowsActions = ({onEditStudent} : any) : RowActionsType[] => {
      return [
          { label: `${sectionName} Edition`, onClick: () => { onEditStudent() }, icon: <IconEdit24/>},
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
                loadingInitialValues={loading}
                enrollmentsData = {enrollmentsData}
                formInitialValues={formIntialValues}
            />
        </ModalComponent>
      }
    </div>
  );
}
