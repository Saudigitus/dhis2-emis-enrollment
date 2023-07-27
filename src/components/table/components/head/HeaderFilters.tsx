import React from "react";
import ConfigTableColumns from "../configTableColumns/ConfigTableColumns";
import EnrollmentFilters from "../filters/enrollment/EnrollmentFilters";
import { useHeader } from "../../../../hooks/tableHeader/useHeader";
import SwitchButtonView from "../../../buttons/MultipleButtons/SwitchButtonView";

function HeaderFilters() {
  const { columns } = useHeader();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <EnrollmentFilters />

      <div className="d-flex align-items-center">
        <SwitchButtonView />
        <ConfigTableColumns headers={columns} updateVariables={() => {}} />
      </div>
    </div>
  );
}

export default HeaderFilters;
