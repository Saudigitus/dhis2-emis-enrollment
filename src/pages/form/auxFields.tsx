import { Attribute } from "../../types/generated/models";
import { type CustomAttributeProps } from "../../types/table/attributeColumns";

export const fieldsData: CustomAttributeProps[] = [
  {
    id: "name",
    labelName: "Name",
    displayName: "Name",
    header: "Name",
    disabled: false,
    valueType: Attribute.valueType
      .TEXT as unknown as CustomAttributeProps["valueType"],
    name: "name",
    required: false,
    visible: true
  },
  {
    id: "birthdate",
    labelName: "Birth Date",
    displayName: "Birth Date",
    header: "Birth Date",
    disabled: false,
    valueType: Attribute.valueType
      .DATE as unknown as CustomAttributeProps["valueType"],
    name: "birthdate",
    required: false,
    visible: true
  },
  {
    id: "housenr",
    labelName: "House no",
    displayName: "House no",
    header: "House no",
    disabled: false,
    valueType: Attribute.valueType
      .NUMBER as unknown as CustomAttributeProps["valueType"],
    name: "housenr",
    required: false,
    visible: true
  },
  {
    id: "time",
    labelName: "Time",
    displayName: "Time",
    header: "Time",
    disabled: false,
    valueType: Attribute.valueType
      .TIME as unknown as CustomAttributeProps["valueType"],
    name: "time",
    required: false,
    visible: true
  },
  {
    id: "blockno",
    labelName: "Block no",
    displayName: "Block no",
    header: "Block no",
    disabled: false,
    valueType: Attribute.valueType
      .INTEGER_ZERO_OR_POSITIVE as unknown as CustomAttributeProps["valueType"],
    name: "blockno",
    required: false,
    visible: true
  },
  {
    id: "phone",
    labelName: "Phone number",
    displayName: "Phone number",
    header: "Phone number",
    disabled: false,
    valueType: Attribute.valueType
      .PHONE_NUMBER as unknown as CustomAttributeProps["valueType"],
    name: "phone",
    required: false,
    visible: true
  },
  {
    id: "gender",
    labelName: "Gender",
    displayName: "Gender",
    header: "Gender",
    disabled: false,
    valueType: Attribute.valueType
      .LIST as unknown as CustomAttributeProps["valueType"],
    options: { optionSet: [{ value: 'F', label: 'Female' }, { value: 'M', label: 'Male' }] },
    name: "gender",
    required: false,
    visible: true
  },
  {
    id: "check",
    labelName: "Check",
    displayName: "Check",
    header: "Check",
    disabled: false,
    valueType: Attribute.valueType
      .TRUE_ONLY as unknown as CustomAttributeProps["valueType"],
    name: "check",
    required: false,
    visible: true
  },
  {
    id: "switch",
    labelName: "Switch",
    displayName: "Switch",
    header: "Switch",
    disabled: false,
    valueType: Attribute.valueType
      .BOOLEAN as unknown as CustomAttributeProps["valueType"],
    name: "switch",
    required: false,
    visible: true
  }
];
