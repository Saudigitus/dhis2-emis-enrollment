import React, { useEffect } from "react";
import { Table } from "../../components";
import { useParams } from "../../hooks/commons/useQueryParams";
import { useGetProgramConfig } from "../../hooks/programConfig/useGetprogramConfig";
import { CenteredContent, CircularLoader } from "@dhis2/ui";

function TableComponent() {
  const { add } = useParams();
  const { loading } = useGetProgramConfig()

  useEffect(() => {
    add("school", "Shc3qNhrPAz");
    add("academicYear", "2023");
    add("grade", "12");
    add("class", "12");
  }, []);

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
