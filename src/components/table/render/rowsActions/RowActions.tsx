import { useState, useEffect } from 'react';
import style from './rowActions.module.css'
import { IconButton, Tooltip } from '@material-ui/core';
import { useGetEnrollmentDeleteFormData, useGetEnrollmentForm, useParams } from '../../../../hooks';
import { ModalComponent, ModalContentUpdate, ModalDeleteContent } from '../../../modal';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';
import useGetEnrollmentUpdateFormData from '../../../../hooks/form/useGetEnrollmentUpdateFormData';
import { IconEdit24, IconDelete24, CircularLoader, CenteredContent } from "@dhis2/ui";
import { EnrollmentStatus } from '../../../../types/api/WithRegistrationProps';
import { checkOwnershipOu } from '../../../../utils/table/rows/checkCanceled';


export default function RowActions(props: RowActionsProps) {
  const { row } = props;
  const { trackedEntity, enrollmentId, status, ownershipOu } = row;
  const { urlParamiters } = useParams()
  const { school } = urlParamiters();
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm()
  const [openEditionModal, setOpenEditionModal] = useState<boolean>(false);
  const [openDeletionModal, setOpenDeletionModal] = useState<boolean>(false);
  const { initialValues, loading, error, buildFormData, enrollmentValues, setInitialValues } = useGetEnrollmentUpdateFormData()
  const { loading: eventsLoading, buildDeleteFormData, initialValues: deleteFormInitialValues } = useGetEnrollmentDeleteFormData()

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
      color:  (status === EnrollmentStatus.CANCELLED || !checkOwnershipOu(ownershipOu, school as unknown as string)) ? 'rgba(39, 115, 20, .35)' :'#277314',
      label: `${sectionName} Edition`,
      disabled: status === EnrollmentStatus.CANCELLED || !checkOwnershipOu(ownershipOu, school as unknown as string),
      onClick: () => { buildFormData(trackedEntity, enrollmentId); setOpenEditionModal(!openEditionModal) },
    },
    {
      icon: <IconDelete24 />,
      color: checkOwnershipOu(ownershipOu, school as unknown as string) ? '#d64d4d' : 'rgba(214, 77, 77, .35)',
      label: `Delete ${sectionName}`,
      disabled: checkOwnershipOu(ownershipOu, school as unknown as string) ? false : true,
      onClick: () => { buildDeleteFormData(trackedEntity, enrollmentId); setOpenDeletionModal(!openDeletionModal) },
    }
  ];

  return (
    <div className={style.rowActionsContainer}>

      {rowsActions.map((option: RowActionsType, i: number) => (
        <Tooltip
          key={i}
          title={option.label}
          disabled={option?.disabled}
          onClick={() => { option.onClick() }}
        >
          <IconButton style={{color: option.color}}className={style.rowActionsIcon}>{option.icon}</IconButton>
        </Tooltip>
      ))}

      {
        openEditionModal &&
        <ModalComponent title={`Single ${sectionName} Edition`} open={openEditionModal} setOpen={setOpenEditionModal}>
          {
            Object.keys(initialValues).length ?
              <ModalContentUpdate setOpen={setOpenEditionModal} sectionName={sectionName} loadingInitialValues={loading} enrollmentsData={enrollmentsData} enrollmentValues={enrollmentValues} formInitialValues={initialValues} />
              :
              <CenteredContent className="p-5">
                <CircularLoader />
              </CenteredContent>
          }
        </ModalComponent>
      }

      {
        openDeletionModal &&

        <ModalComponent title={`Enrollment Deletion`} open={openDeletionModal} setOpen={setOpenDeletionModal}>
          {
            Object.keys(deleteFormInitialValues).length ?
              <ModalDeleteContent setOpen={setOpenDeletionModal} sectionName={sectionName} loading={eventsLoading} initialValues={deleteFormInitialValues} />
              :
              <CenteredContent>
                <CircularLoader />
              </CenteredContent>
          }
        </ModalComponent>
      }
    </div>
  );
}
