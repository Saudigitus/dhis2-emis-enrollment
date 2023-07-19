import React from "react";
import styles from "./card.module.css";

interface CardProps {
  value: string
  label: string
  color: string
}

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
