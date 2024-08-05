import React from "react";
import styles from "./modal.module.css";
import { ModalProps } from "../../types/modal/ModalProps";
import { Modal, ModalTitle, ModalContent } from "@dhis2/ui";
import CloseModalButton from "./CloseModalButton";

function ModalComponent(props: ModalProps): React.ReactElement {
  const { open, setOpen, title, children } = props;


  return (
    <Modal
      large
      open={open}
      position={"middle"}
      className={styles.modalContainer}
    >
      <CloseModalButton onClick={() => setOpen(false)} />
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}

export default ModalComponent;

