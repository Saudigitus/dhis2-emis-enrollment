import React from "react";
import {  Label } from "@dhis2/ui";
import styles from "../../components/table.module.css";
import { useEnrollmentsHeader } from "../../../../hooks/tableHeader/useEnrollmentsHeader";
import { EnrollmentDetailsComponentProps } from "../../../../types/table/TableContentProps";
import Subtitle from "../../../text/subtitle";

function EnrollmentDetailsComponent(props: EnrollmentDetailsComponentProps): React.ReactElement {
  const { enrollmentsData } = props;
  const { columns: dataElements } = useEnrollmentsHeader();

  return (
    <React.Fragment>
      <div className="row w-100 pb-2">
        <div className="col-12 px-1 pt-2">
         <h6 style={{fontSize: 13}}>Enrollment History</h6> 
        </div>
        {enrollmentsData.length ?
          enrollmentsData?.map((enrollment: any) => (
            <div className="col-12 col-md-3 p-0">
              <div className={styles.detailsCard}>
                {dataElements?.map((dataElement: any, key: number) => (
                  <div className="d-flex align-items-center" key={key}>
                    <Label className={styles.detailsCardVariable}>{dataElement?.displayName}:</Label>
                    <Label className={styles.detailsCardLabel}> {enrollment[dataElement?.id]} </Label>
                    </div>
                ))}
              </div>
          </div>
          )) : <span className="ml-1">No enrollments found.</span>
        } 
      </div>
    </React.Fragment>
      
  )
}

export default EnrollmentDetailsComponent;
