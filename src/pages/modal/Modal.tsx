import React, { useState } from "react";
import { IconAddCircle24, Button } from "@dhis2/ui";
import { ModalComponent, ModalContentComponent, WithPadding } from "../../components";
import { type ButtonActionProps } from "../../types/buttons/ButtonActions";

function Modal(): React.ReactElement {
  const [open, setOpen] = useState<boolean>(true);

  const modalActions: ButtonActionProps[] = [
    { label: "Close", disabled: false, onClick: () => { setOpen(false) } },
    { label: "Save and add new", primary: true, disabled: false, onClick: () => { setOpen(false) } },
    { label: "Save and close", primary: true, disabled: false, onClick: () => { setOpen(false) } }
  ];

  return (
    <WithPadding>
      <Button icon={<IconAddCircle24 />} onClick={() => { setOpen(true); }}>Open Modal</Button>

      {open && <ModalComponent title="Single Student Enrollment" open={open} setOpen={setOpen} actions={modalActions}><ModalContentComponent /></ModalComponent>}
    </WithPadding>
  );
}

export default Modal;
