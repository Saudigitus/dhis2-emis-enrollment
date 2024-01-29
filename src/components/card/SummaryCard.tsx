import React from "react";
import styles from "./card.module.css";
import { CardProps } from '../../types/common/components'

export default function SummaryCard(props: CardProps): React.ReactElement {
  const { value, label, color } = props;

  return (
    <div className={styles[color]}>
      <div>
        <h5>{value}</h5>
        <span>{label}</span>
      </div>
    </div>
  );
}
