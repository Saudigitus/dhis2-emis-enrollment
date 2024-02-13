import React from "react";
import { Modal, ModalTitle, ModalContent } from "@dhis2/ui";
import styles from "./modal.module.css";
import { ModalProps } from "../../types/modal/ModalProps";

function ModalComponent(props: ModalProps): React.ReactElement {
  const { open, setOpen, title, children } = props;

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
