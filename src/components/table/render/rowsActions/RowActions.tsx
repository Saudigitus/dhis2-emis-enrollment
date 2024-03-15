import { useState, useEffect} from 'react';
import { IconEdit24 } from "@dhis2/ui";
import style from './rowActions.module.css'
import { IconButton,  Tooltip } from '@material-ui/core';
import { useGetEnrollmentForm } from '../../../../hooks';
import { CircularLoader, CenteredContent } from "@dhis2/ui";
import { ModalComponent, ModalContentUpdate } from '../../../modal';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { RowActionsProps, RowActionsType } from '../../../../types/table/TableContentProps';
import useGetEnrollmentUpdateFormData from '../../../../hooks/form/useGetEnrollmentUpdateFormData';

export default function RowActions(props: RowActionsProps) {
  const { row } = props;
  const {trackedEntity, enrollmentId  } = row;
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm()
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { initialValues, loading, buildFormData, enrollmentValues, setInitialValues  } = useGetEnrollmentUpdateFormData ()
  
  const rowsActions = ({onEditStudent} : any) : RowActionsType[] => {
      return [
          { label: `${sectionName} Edition`, onClick: () => { onEditStudent() }, icon: <IconEdit24/>},
      ];
  } 

  const options =  rowsActions({ onEditStudent: () => { buildFormData(trackedEntity, enrollmentId); setOpenModal(!openModal)}})

 
  useEffect(() => {
    if(!openModal)
    setInitialValues({})
  },[openModal])

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
            {
              Object.keys(initialValues).length ?
                <ModalContentUpdate
                    setOpen={setOpenModal}
                    sectionName={sectionName}
                    loadingInitialValues={loading}
                    enrollmentsData = {enrollmentsData}
                    enrollmentValues={enrollmentValues}
                    formInitialValues={initialValues}
                />
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
