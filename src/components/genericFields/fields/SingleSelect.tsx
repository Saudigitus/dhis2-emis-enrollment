import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useField, type FieldRenderProps } from "react-final-form";
import { type CustomAttributeProps } from "../../../types/table/AttributeColumns";
interface AutoCompleteProps {
  disabled?: boolean
  options?: CustomAttributeProps["options"]
  name: string
}

const OptionSetAutocomplete = (props: AutoCompleteProps) => {
  const { input, meta }: FieldRenderProps<any, HTMLElement> = useField(props.name);

  const options = (props?.options?.optionSet?.options != null)
    ? props?.options.optionSet?.options.map((option: { value: string, label: string }) => ({
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
      value={options.find((element: { value: string }) => element.value === input.value)}
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
      }}
    />
  );
};

function SingleSelectField(props: AutoCompleteProps) {
  return (
    <div>
      <OptionSetAutocomplete {...props} name={props.name}/>
    </div>
  );
}

export default SingleSelectField;
