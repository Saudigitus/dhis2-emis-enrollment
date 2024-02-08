import { ReactFinalForm, CheckboxFieldFF, hasValue, Label } from "@dhis2/ui";
import React from "react";
import { CheckFieldProps } from "../../../types/form/GenericFieldsTypes";

const { Field } = ReactFinalForm;

function CheckInput(props: CheckFieldProps) {
  return (
    <div className="d-flex">
      <Field
        {...props}
        type="checkbox"
        component={CheckboxFieldFF}
        validate={Boolean(props.required) && hasValue}
        disabled={props.disabled}
      />
      <Label className="mt-1">Yes</Label>
    </div>
  );
}

export default CheckInput;
