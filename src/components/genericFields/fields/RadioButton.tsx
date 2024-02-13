import { FormControlLabel, RadioGroup, Radio, withStyles } from "@material-ui/core";
import React from "react";
import { Label } from "@dhis2/ui"
import { useField, type FieldRenderProps } from "react-final-form";
import { FormFieldsProps } from "../../../types/form/GenericFieldsTypes";

const CustomRadio = withStyles({
  root: {
    '&$checked': {
      color: "#00695C"
    },
    '&:hover': {
      backgroundColor: 'transparent !important'
    }
  },
  checked: {}
})((props: React.JSX.IntrinsicAttributes) => <Radio disableRipple size="small" color="default" {...props} />);

function RadioButton(props: FormFieldsProps) {
  const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name as unknown as string);
  return (
    <RadioGroup
      {...props}
      row
      onChange={(event: { target: { value: any } }) => {
        input.onChange(event?.target?.value);
      }}
    >
      <FormControlLabel value={"true"} control={<CustomRadio />} label={<Label className="mt-2">Yes</Label>} />
      <FormControlLabel value={"false"} control={<CustomRadio />} label={<Label className="mt-2">No</Label>} />
    </RadioGroup>
  );
}

export default RadioButton;
