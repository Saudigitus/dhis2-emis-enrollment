import React from "react";
import styles from "../button.module.css";
import { ButtonStrip } from "@dhis2/ui";
import { type SimpleButtonsProps } from "../../../types/Buttons/SimpleButtonsProps";

interface ButtonProps {
  items: SimpleButtonsProps[]
  selectedTerm: any
  setSelectedTerm: (arg: object) => void
}

export default function SimpleButton(props: ButtonProps): React.ReactElement {
  const { items, selectedTerm, setSelectedTerm } = props;

  return (
    <ButtonStrip>
      {items.map((item) => (
        <div key={item.id} className={selectedTerm.id === item.id ? styles["active-button"] : styles.simpleButton} onClick={() => { setSelectedTerm(item) }}>
          <span className={styles.simpleButtonLabel}>{item.label}</span>
        </div>
      ))}
    </ButtonStrip>
  );
}
