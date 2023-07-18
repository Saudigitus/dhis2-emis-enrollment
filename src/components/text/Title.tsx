import React from "react";
import styles from "./text.module.css";

interface TitleProps {
  label: string
}
function Title(props: TitleProps): React.ReactElement {
  const { label } = props;

  return <label className={styles.title}>{label}</label>;
}

export default Title;
