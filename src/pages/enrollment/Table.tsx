import React from "react";
import { Table } from "../../components";
import { useGetProgramConfig } from "../../hooks/programConfig/useGetprogramConfig";
import { CenteredContent, CircularLoader } from "@dhis2/ui";

function TableComponent() {
  const { loading } = useGetProgramConfig()

  if (loading) {
    return (
      <CenteredContent>
        <CircularLoader />
      </CenteredContent>
    )
  }

  return <Table />;
}

export default TableComponent;
