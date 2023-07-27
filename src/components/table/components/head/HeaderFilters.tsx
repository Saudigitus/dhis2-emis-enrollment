import React from "react";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";
import { useHeader } from "../../../../hooks/tableHeader/useHeader";

function HeaderFilters() {
  const { columns } = useHeader();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <EnrollmentFilters />

      <ConfigTableColumns headers={columns} updateVariables={() => {}} />
    </div>
  );
}

export default HeaderFilters;
