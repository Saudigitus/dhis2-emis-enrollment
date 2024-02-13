import React from "react";
import styles from "./text.module.css";
import { TitleProps } from "../../types/template/TemplateProps";

function Title(props: TitleProps): React.ReactElement {
  const { label } = props;

  return <label className={styles.title}>{label}</label>;
}

export default Title;
