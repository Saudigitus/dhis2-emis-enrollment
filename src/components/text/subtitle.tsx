import React from "react";
import styles from "./text.module.css";

interface SubtitleProps {
  label: string
}
function Subtitle(props: SubtitleProps): React.ReactElement {
  const { label } = props;

  return <h6 className={styles.subTitle}>{label}</h6>;
}

export default Subtitle;
