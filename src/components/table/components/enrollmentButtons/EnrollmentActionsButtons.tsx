import React, { useState } from 'react'
import { IconAddCircle24, Button, ButtonStrip, IconUserGroup16, IconSearch24 } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import Tooltip from '@material-ui/core/Tooltip';
import { useGetEnrollmentForm, useParams } from '../../../../hooks';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { FlyoutOptionsProps } from "../../../../types/buttons/FlyoutOptionsProps";
import { BulkEnrollment } from "../../../bulkImport/BulkEnrollment";
import DropdownButtonComponent from "../../../buttons/DropdownButton";
import { ModalExportTemplateContent, ModalSearchEnrollmentContent } from '../../../modal';
import { getDataStoreKeys } from '../../../../utils/commons/dataStore/getDataStoreKeys';
import styles from './enrollmentActionsButtons.module.css'

function EnrollmentActionsButtons() {
  const [open, setOpen] = useState<boolean>(false);
  const [openExportEmptyTemplate, setOpenExportEmptyTemplate] = useState<boolean>(false);
  const [openSearchEnrollment, setOpenSearchEnrollment] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const { useQuery } = useParams();
  const { allowSearching } = getDataStoreKeys();
  const orgUnit = useQuery().get("school")
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm();

  const enrollmentOptions: FlyoutOptionsProps[] = [
    { label: `Enroll new ${sectionName}(s)`, divider: true, onClick: () => { setOpenImport(true); } },
    { label: "Download template", divider: false, onClick: () => { setOpenExportEmptyTemplate(true) } }
  ];

  return (
    <div className={styles.container}>
      <ButtonStrip className={styles.work_buttons}>
        {allowSearching ?
          <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
            <span>
              <Button disabled={orgUnit == null} onClick={() => { setOpenSearchEnrollment(true); }} icon={<IconSearch24 />}>
                <span className={styles.work_buttons_text}>Search {sectionName.toLowerCase()}</span>
              </Button>
            </span>
          </Tooltip> : null
        }


        <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <Button disabled={orgUnit == null} onClick={() => { setOpen(true); }} icon={<IconAddCircle24 />}>
              <span className={styles.work_buttons_text}>Enroll {sectionName.toLocaleLowerCase()}</span>
            </Button>
          </span>
        </Tooltip>
        <DropdownButtonComponent
          name={<span className={styles.work_buttons_text}>Bulk enrollment</span> as unknown as string}
          disabled={false}
          icon={<IconUserGroup16 />}
          options={enrollmentOptions}
        />
      </ButtonStrip>

      {open && <ModalComponent title={`Single ${sectionName} Enrollment`} open={open} setOpen={setOpen}>
        <ModalContentComponent
          sectionName={sectionName}
          enrollmentsData={enrollmentsData}
          setOpen={setOpen}
        />
      </ModalComponent>}
      {openImport && <BulkEnrollment setOpen={setOpenImport} isOpen={openImport} />}

      {openExportEmptyTemplate && <ModalComponent title={`Data Import Template Export`} open={openExportEmptyTemplate} setOpen={setOpenExportEmptyTemplate}>
        <ModalExportTemplateContent
          sectionName={sectionName}
          setOpen={setOpenExportEmptyTemplate}
        />
      </ModalComponent>}

      {openSearchEnrollment && <ModalComponent title={`Search for enrolled ${sectionName.toLowerCase()}`} open={openSearchEnrollment} setOpen={setOpenSearchEnrollment}>
        <ModalSearchEnrollmentContent
          sectionName={sectionName}
          setOpen={setOpenSearchEnrollment}
          setOpenNewEnrollment={setOpen}
        />
      </ModalComponent>}
    </div>
  )
}

export default EnrollmentActionsButtons
