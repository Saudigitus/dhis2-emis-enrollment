import React, { useState } from 'react'
import { IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import ImportContent from '../../../modal/ImportContent';
import Tooltip from '@material-ui/core/Tooltip';
import { useGetEnrollmentForm, useParams } from '../../../../hooks';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';

function EnrollmentActionsButtons() {
  const [open, setOpen] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const { useQuery } = useParams();
  const orgUnit = useQuery().get("school")
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm();

  return (
    <div>
      <ButtonStrip>
        <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <Button disabled={orgUnit == null} onClick={() => { setOpen(true); }} icon={<IconAddCircle24 />}>Enrol single {sectionName}</Button>
          </span>
        </Tooltip>
      </ButtonStrip>

      {open && <ModalComponent title={`Single ${sectionName} Enrollment`} open={open} setOpen={setOpen}>
        <ModalContentComponent
          sectionName={sectionName}
          enrollmentsData={enrollmentsData}
          setOpen={setOpen}
        />
      </ModalComponent>}
      {openImport && <ModalComponent title={`Import ${sectionName}`} open={openImport} setOpen={setOpenImport}><ImportContent setOpen={setOpen} /></ModalComponent>}
    </div>
  )
}

export default EnrollmentActionsButtons
