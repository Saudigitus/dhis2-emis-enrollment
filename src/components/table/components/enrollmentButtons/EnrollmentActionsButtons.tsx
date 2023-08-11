import React, { useState } from 'react'
import { IconUserGroup16, IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import ImportContent from '../../../modal/ImportContent';
import DropdownButtonComponent from '../../../buttons/DropdownButton';
import { type FlyoutOptionsProps } from '../../../../types/buttons/FlyoutOptions';
import { useParams } from '../../../../hooks/commons/useQueryParams';
import Tooltip from '@material-ui/core/Tooltip';

function EnrollmentActionsButtons() {
  const [open, setOpen] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const { useQuery } = useParams();
  const orgUnit = useQuery().get("school")

  const enrollmentOptions: FlyoutOptionsProps[] = [
    { label: "Import students", divider: true, onClick: () => { setOpenImport(true); } },
    { label: "Export empty template", divider: false, onClick: () => { alert("Export empty template"); } },
    { label: "Export template with data", divider: false, onClick: () => { alert("Export template with data"); } }
  ];

  return (
    <div>
      <ButtonStrip>
        <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <Button disabled={orgUnit == null} onClick={() => { setOpen(true); }} icon={<IconAddCircle24 />}>Enrol single student</Button>
          </span>
        </Tooltip>

        <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <DropdownButtonComponent
              disabled={orgUnit == null}
              name="Bulk enrollment"
              icon={<IconUserGroup16 />}
              options={enrollmentOptions}
            />
          </span>
        </Tooltip>
      </ButtonStrip>

      {open && <ModalComponent title="Single Student Enrollment" open={open} setOpen={setOpen}><ModalContentComponent setOpen={setOpen} /></ModalComponent>}
      {openImport && <ModalComponent title="Import Students" open={openImport} setOpen={setOpenImport}><ImportContent setOpen={setOpen} /></ModalComponent>}
    </div>
  )
}

export default EnrollmentActionsButtons
