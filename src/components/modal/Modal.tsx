import React from "react";
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  Button,
  ButtonStrip
} from "@dhis2/ui";
import styles from "./modal.module.css";
import { type ButtonActionProps } from "../../types/buttons/ButtonActions";

interface ModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  children: React.ReactNode
  actions: ButtonActionProps[]
}

function ModalComponent({
  open,
  setOpen,
  title,
  children,
  actions
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
      <ModalActions>
        <ButtonStrip end className="mr-4">
          {actions.map((action, i) => (
            <Button
              key={i}
              {...action}
            >
              {action.label}
            </Button>
          ))}
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}

export default ModalComponent;
