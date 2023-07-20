import React, { useEffect } from "react";
import { Table } from "../../components";
import { useParams } from "../../hooks/commons/useQueryParams";

function TableComponent() {
  const { add } = useParams();

  useEffect(() => {
    add("ou", "ouId");
    add("program", "ur1Edk5Oe2n");
    add("academicYear", "2023");
    add("grade", "12");
    add("class", "12");
  }, []);

  return <Table />;
}

export default TableComponent;
