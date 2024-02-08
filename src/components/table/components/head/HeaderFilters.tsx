import React from "react";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";
import styles from './HeaderFilters.module.css'
import { useHeader } from "../../../../hooks";

function HeaderFilters() {
  const { columns } = useHeader();
  return (
    <div className={styles.filterContainer}>
      <EnrollmentFilters />

      <ConfigTableColumns headers={columns} updateVariables={() => { }} />
    </div>
  );
}

export default HeaderFilters;
