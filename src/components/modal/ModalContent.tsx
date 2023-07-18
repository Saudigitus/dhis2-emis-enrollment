import React from "react";
import { Divider, Box, Label, InputField } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import styles from "./modal.module.css";
import { Col, Row } from "react-bootstrap";
import { formFields } from "../../utils/constants/fields/fieldsAttributes";
import Subtitle from "../text/subtitle";

function ModalContentComponent(): React.ReactElement {
  return (
    <>
      {formFields().map((ff: any, i: number) => (
        <WithPadding key={i}>
          <Subtitle label={ff.section}/>
          <WithPadding />
          <Label>{ff.description}</Label>
          <WithPadding p="0.2rem" />
          <Box width="100%">
            {ff.fields.map((field: any, f: number) => (
              <Row className={styles.formSection} key={f}>
                <Col sm={5}>
                  <Label>{field.label}</Label>
                </Col>
                <Col sm={7}>
                  <InputField disabled={field.disabled} name={field.attribute} placeholder={field.label} />
                </Col>
              </Row>
            ))}
            <Divider />
          </Box>
        </WithPadding>
      ))}
    </>
  );
}

export default ModalContentComponent;
