import { ReactFinalForm, CheckboxFieldFF, hasValue } from "@dhis2/ui";
import React from "react";

interface CheckFieldProps {
  disabled: boolean
  required: string | boolean
}

const { Field } = ReactFinalForm;

function CheckInput(props: CheckFieldProps) {
  return (
    <div>
      <Field
        {...props}
        type="checkbox"
        component={CheckboxFieldFF}
        validate={Boolean(props.required) && hasValue}
        disabled={props.disabled}
      />
    </div>
  );
}

export default CheckInput;
