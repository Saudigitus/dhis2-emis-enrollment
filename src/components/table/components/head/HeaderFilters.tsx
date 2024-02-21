import React from "react";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";
import styles from './HeaderFilters.module.css'
import { useHeader } from "../../../../hooks";
import { useRecoilState } from "recoil";
import { TableColumnState } from "../../../../schema/columnSchema";

function HeaderFilters() {
  const { columns } = useHeader();
  const [updatedCols, setTableColumns] = useRecoilState(TableColumnState)

  const setTableHeaders = (tableHeaders: any) => setTableColumns(tableHeaders)

  return (
    <div className={styles.filterContainer}>
      <EnrollmentFilters />

      <ConfigTableColumns filteredHeaders={updatedCols} headers={columns} updateVariables={setTableHeaders} />
    </div>
  );
}

export default HeaderFilters;
