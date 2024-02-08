import { ReactFinalForm, InputFieldFF, hasValue } from "@dhis2/ui";
import React from "react";
import { FormFieldsProps } from "../../../types/form/GenericFieldsTypes";

const { Field } = ReactFinalForm;

function DateInput(props: FormFieldsProps) {
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
