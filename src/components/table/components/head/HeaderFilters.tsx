import React from "react";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";
import { useHeader } from "../../../../hooks/tableHeader/useHeader";
import styles from './headerFilters.module.css'

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
