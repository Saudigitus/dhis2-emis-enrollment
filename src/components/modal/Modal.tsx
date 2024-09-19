import React from "react";
import styles from "./modal.module.css";
import { ModalProps } from "../../types/modal/ModalProps";
import { Modal, ModalTitle, ModalContent } from "@dhis2/ui";
import CloseModalButton from "./CloseModalButton";
import { useRecoilValue } from "recoil";
import { ProgressState } from "../../schema/linearProgress";

function ModalComponent(props: ModalProps): React.ReactElement {
  const { open, setOpen, title, children } = props;
  const progress = useRecoilValue(ProgressState)

  return (
    <Modal
      large
      open={open}
      position={"middle"}
      className={styles.modalContainer}
    >
      <CloseModalButton onClick={() => setOpen(false)} />
      {progress.progress == null && <ModalTitle>{title}</ModalTitle>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}

export default ModalComponent;

