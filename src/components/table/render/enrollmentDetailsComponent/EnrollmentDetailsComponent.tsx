import React from "react";
import { Label, Button, IconAddCircle16 } from "@dhis2/ui";
import styles from "./enrollmentDetails.module.css";
import { useEnrollmentsHeader } from "../../../../hooks/tableHeader/useEnrollmentsHeader";
import { EnrollmentDetailsComponentProps } from "../../../../types/table/TableContentProps";
import Subtitle from "../../../text/subtitle";
import classNames from "classnames";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import useGetSectionTypeLabel from "../../../../hooks/commons/useGetSectionTypeLabel";
import ButtonComponent from "../../../buttons/Button";

function EnrollmentDetailsComponent(props: EnrollmentDetailsComponentProps): React.ReactElement {
  const { enrollmentsData, existingAcademicYear, onSelectTei } = props;
  const { columns: dataElements } = useEnrollmentsHeader();
  const { sectionName } = useGetSectionTypeLabel();

  return (
    <div className={styles.details_container}>
      <div className={styles.details_header}>
        <div className={styles.details_header_title}>
          <h6 style={{ fontSize: 13 }}>Enrollment History</h6>
        </div>
        <div className={styles.details_header_button}>
          {existingAcademicYear ?
            <i className={styles.enrolledAlertLabel}>This {sectionName} is already enrolled for this year.</i>
            :
            <ButtonComponent {...{ small: true, success: "success", onClick: onSelectTei, label: "New enrollment", icon: <IconAddCircle16 /> }} />

          }
        </div>
      </div>
      <div className={styles.details_body}>

        {enrollmentsData.length ?
          enrollmentsData?.map((enrollment: any) => (
            <div className={styles.detailsCard}>
              {dataElements?.map((dataElement: any, key: number) => (
                <div className={styles.details_body_list} key={key}>
                  <Label className={styles.detailsCardVariable}>{dataElement?.displayName}:</Label>
                  <Label className={styles.detailsCardLabel}> {enrollment[dataElement?.id]} </Label>
                </div>
              ))}
            </div>
          )) : <span className="ml-1">No enrollments found.</span>
        }
      </div>
    </div>

  )
}

export default EnrollmentDetailsComponent;
