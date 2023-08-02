import React from "react";
import { Divider, Box, Label, InputField, ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import styles from "./modal.module.css";
import { Col, Row } from "react-bootstrap";
import { formFields } from "../../utils/constants/fields/fieldsAttributes";
import Subtitle from "../text/subtitle";
interface ContentProps {
  setOpen: (value: boolean) => void
}

function ModalContentComponent({ setOpen }: ContentProps): React.ReactElement {
  const modalActions = [
    { label: "Cancel", disabled: false, loading: false, onClick: () => { setOpen(false) } },
    { label: "Save and add new", primary: true, disabled: false, loading: false, onClick: () => { setOpen(false) } },
    { label: "Save and close", primary: true, disabled: false, loading: false, onClick: () => { setOpen(false) } }
  ];
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
          </Box>
        <Divider />
        </WithPadding>
      ))}

      <ModalActions>
        <ButtonStrip end className="mr-4">
          {modalActions.map((action, i) => (
            <Button
              key={i}
              {...action}
            >
              {action.loading ? "Loading..." : action.label}
            </Button>
          ))}
        </ButtonStrip>
      </ModalActions>
    </>
  );
}

export default ModalContentComponent;
