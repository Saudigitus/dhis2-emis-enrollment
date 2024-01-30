import React from "react";
import styles from "./text.module.css";
import { type TitleProps } from "../../types/common/components";

function Subtitle(props: TitleProps): React.ReactElement {
  const { label } = props;

  return <h6 className={styles.subTitle}>{label}</h6>;
}

export default Subtitle;
