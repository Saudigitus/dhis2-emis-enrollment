import React from "react";
import { InfoPage, Table } from "../../components";
import { useParams } from "../../hooks";

function TableComponent() {
  const { urlParamiters } = useParams()
  const school = urlParamiters().school as unknown as string

  return (
    <>
      {(school !== null)
        ? <Table />
        : <InfoPage />
      }
    </>
  )
}

export default TableComponent;
