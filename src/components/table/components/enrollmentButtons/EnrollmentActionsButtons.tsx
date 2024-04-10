import React, { useState } from 'react'
import { IconAddCircle24, Button, ButtonStrip, IconUserGroup16 } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import Tooltip from '@material-ui/core/Tooltip';
import { useGetEnrollmentForm, useParams } from '../../../../hooks';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { FlyoutOptionsProps } from "../../../../types/buttons/FlyoutOptionsProps";
import { BulkEnrollment } from "../../../bulkImport/BulkEnrollment";
import DropdownButtonComponent from "../../../buttons/DropdownButton";
import { ModalExportTemplateContent, ModalSearchEnrollmentContent } from '../../../modal';

function EnrollmentActionsButtons() {
  const [open, setOpen] = useState<boolean>(false);
  const [openExportEmptyTemplate, setOpenExportEmptyTemplate] = useState<boolean>(false);
  const [openSearchEnrollment, setOpenSearchEnrollment] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const { useQuery } = useParams();
  const orgUnit = useQuery().get("school")
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm();

  const enrollmentOptions: FlyoutOptionsProps[] = [
    { label: "Enroll new students", divider: true, onClick: () => { setOpen(true); } },
    { label: "Download template", divider: false, onClick: () => { setOpenExportEmptyTemplate(true) } },
    // { label: "Export empty template", divider: false, onClick: () => { alert("Export empty"); } },
    // { label: "Export existing students", divider: false, onClick: () => { alert("Export existing students"); } }
  ];

  return (
    <div>
      <ButtonStrip>
        <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <Button disabled={orgUnit == null} onClick={() => { setOpenSearchEnrollment(true); }} icon={<IconAddCircle24 />}>Enrol single {sectionName}</Button>
          </span>
        </Tooltip>
        <DropdownButtonComponent
          name="Bulk enrollment"
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

      {openExportEmptyTemplate && <ModalComponent title={`Data Import Template Export`} open={open} setOpen={setOpen}>
        <ModalExportTemplateContent
          sectionName={sectionName}
          setOpen={setOpenExportEmptyTemplate}
        />
      </ModalComponent>}

      {openSearchEnrollment && <ModalComponent  title={`Single ${sectionName} Enrollment`} open={openSearchEnrollment} setOpen={setOpenSearchEnrollment}>
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
