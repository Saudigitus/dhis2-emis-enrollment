import { useState, useEffect } from 'react';
import style from './rowActions.module.css'
import { IconEdit24, IconDelete24 } from "@dhis2/ui";
import { IconButton, Tooltip } from '@material-ui/core';
import { useGetEnrollmentDeleteFormData, useGetEnrollmentForm } from '../../../../hooks';
import { ModalComponent, ModalContentUpdate, ModalDeleteContent } from '../../../modal';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';
import useGetEnrollmentUpdateFormData from '../../../../hooks/form/useGetEnrollmentUpdateFormData';


export default function RowActions(props: RowActionsProps) {
  const { row } = props;
  const { trackedEntity, enrollmentId } = row;
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm()
  const [openEditionModal, setOpenEditionModal] = useState<boolean>(false);
  const [openDeletionModal, setOpenDeletionModal] = useState<boolean>(false);
  const { initialValues, loading, error, buildFormData, enrollmentValues, setInitialValues } = useGetEnrollmentUpdateFormData()
  const { loading: envtsLoading, buildDeleteFormData, initialValues: deleteFormInitialValues } = useGetEnrollmentDeleteFormData()


  useEffect(() => {
    if (error)
      setOpenEditionModal(false)
  }, [error])

  useEffect(() => {
    if (!openEditionModal)
      setInitialValues({})
  }, [openEditionModal])

  const rowsActions: RowActionsType[] = [
    {
      icon: <IconEdit24 />,
      label: `${sectionName} Edition`,
      onClick: () => { buildFormData(trackedEntity, enrollmentId); setOpenEditionModal(!openEditionModal) },
    },
    {
      icon: <IconDelete24 />,
      label: `Delete ${sectionName}`,
      onClick: () => { buildDeleteFormData(trackedEntity,enrollmentId); setOpenDeletionModal(!openDeletionModal) },
    }
  ];

  return (
    <div className={style.rowActionsContainer}>

      {rowsActions.map((option: RowActionsType, i: number) => (
        <Tooltip key={i} title={option.label} onClick={() => { option.onClick() }}>
          <IconButton className={style.rowActionsIcon}>{option.icon}</IconButton>
        </Tooltip>
      ))}

      {
        openEditionModal &&
        <ModalComponent title={`Single ${sectionName} Edition`} open={openEditionModal} setOpen={setOpenEditionModal}>
          <ModalContentUpdate setOpen={setOpenEditionModal} sectionName={sectionName} loadingInitialValues={loading} enrollmentsData={enrollmentsData} enrollmentValues={enrollmentValues} formInitialValues={initialValues} />
        </ModalComponent>
      }

      {
        openDeletionModal &&
        <ModalComponent title={`Single ${sectionName} Deletion`} open={openDeletionModal} setOpen={setOpenDeletionModal}>
          <ModalDeleteContent setOpen={setOpenDeletionModal} sectionName={sectionName} loading={envtsLoading}  initialValues={deleteFormInitialValues} />
        </ModalComponent>
      }
    </div>
  );
}
