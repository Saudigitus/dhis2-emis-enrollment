import React, { useState } from 'react'
import WithPadding from '../../../../template/WithPadding'
import { Chip, IconUserGroup16, IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import DropdownButtonComponent from '../../../../buttons/DropdownButton';
import { enrollmentOptions } from '../../../../buttons/options';
import ModalComponent from '../../../../modal/Modal';
import ModalContentComponent from '../../../../modal/ModalContent';
import { type ButtonActionProps } from '../../../../../types/buttons/ButtonActions';

function WorkingLits() {
  const [open, setOpen] = useState<boolean>(false);

  const modalActions: ButtonActionProps[] = [
    { label: "Close", disabled: false, onClick: () => { setOpen(false) } },
    { label: "Save and add new", primary: true, disabled: false, onClick: () => { setOpen(false) } },
    { label: "Save and close", primary: true, disabled: false, onClick: () => { setOpen(false) } }
  ];

  return (
    <WithPadding>
      <div className='d-flex justify-content-between'>
        <div>
          <Chip>
            Active enrollments
          </Chip>
          <Chip>
            Completed enrollments
          </Chip>
          <Chip>
            Cancelled enrollments
          </Chip>
        </div>

        <div>
          <ButtonStrip>
            <Button onClick={() => { setOpen(true); }} icon={<IconAddCircle24 />}>Enrol single student</Button>
            <DropdownButtonComponent
              name="Bulk enrollment"
              icon={<IconUserGroup16 />}
              options={enrollmentOptions}
            />
          </ButtonStrip>
        </div>
      </div>
      {open && <ModalComponent title="Single Student Enrollment" open={open} setOpen={setOpen} actions={modalActions}><ModalContentComponent /></ModalComponent>}
    </WithPadding>
  )
}

export default WorkingLits
