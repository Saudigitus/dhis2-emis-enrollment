import { ReactFinalForm, InputFieldFF, hasValue } from "@dhis2/ui";
import React from "react";
import { type GenericFieldsProps } from "../../../types/fields/GenericFieldsTypes";

const { Field } = ReactFinalForm;

function DateInput(props: GenericFieldsProps) {
  return (
    <Field
      {...props}
      type="date"
      component={InputFieldFF}
      validate={(Boolean(props.required)) && hasValue}
      disabled={props.disabled}
    />
  );
}

export default DateInput;
