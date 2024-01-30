import React from "react";
import styles from "./text.module.css";
import { type TitleProps } from "../../types/common/components";

function Title(props: TitleProps): React.ReactElement {
  const { label } = props;

  return <label className={styles.title}>{label}</label>;
}

export default Title;
