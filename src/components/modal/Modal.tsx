import React from "react";
import { Modal, ModalTitle, ModalContent } from "@dhis2/ui";
import styles from "./modal.module.css";

interface ModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  children: React.ReactNode
}

function ModalComponent({
  open,
  setOpen,
  title,
  children
}: ModalProps): React.ReactElement {
  return (
    <Modal
      className={styles.modalContainer}
      open={open}
      position={"middle"}
      onClose={() => {
        setOpen(false);
      }}
    >
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}

export default ModalComponent;
