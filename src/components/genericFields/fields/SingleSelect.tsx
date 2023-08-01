import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useField, type FieldRenderProps } from "react-final-form";
import { type CustomAttributeProps } from "../../../types/table/attributeColumns";
interface AutoCompleteProps {
  disabled?: boolean
  optionSet: CustomAttributeProps["options"]
  name: string
}

const OptionSetAutocomplete = ({ optionSet, ...props }: AutoCompleteProps) => {
  const { input, meta }: FieldRenderProps<any, HTMLElement> = useField(props.name);

  const options = (optionSet?.optionSet != null)
    ? optionSet.optionSet.map((option) => ({
        value: option.value,
        label: option.label
      }))
    : [];

  return (
    <Autocomplete
      {...props}
      options={options}
      closeIcon={null}
      disabled={props.disabled}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => option.value === value.value}
      value={options.find((element) => element.value === input.value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          error={(meta.touched === true) && meta.error}
          helperText={(meta.touched === true) && meta.error}
          size="small"
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: "#fff"
            }
          }}
        />
      )}
      onChange={(_, value) => {
        input.onChange(value?.value);
        console.log("variables", value);
      }}
    />
  );
};

function SingleSelectField(props: AutoCompleteProps) {
  console.log("props", props);
  return (
    <div>
      <OptionSetAutocomplete name={props.name} optionSet={props.optionSet} />
    </div>
  );
}

export default SingleSelectField;
