import React from "react";
import CheckInput from "./fields/CheckInput.js";
import DateInput from "./fields/DateInput.js";
import InputNumber from "./fields/InputNumber.js";
import InputText from "./fields/InputText.js";
import SingleSelectField from "./fields/SingleSelect.js";
import InputArea from "./fields/InputArea.js";
import { type CustomAttributeProps } from "../../types/common/components";
import { Attribute } from "../../types/generated/models.js";
import RadioButton from "./fields/RadioButton.js";
import { type GenericFieldsComponentProps } from "../../types/fields/GenericFieldsTypes.js";

function GenericFields({ attribute, disabled, valueType }: GenericFieldsComponentProps) {
  switch (valueType) {
    case Attribute.valueType.BOOLEAN as unknown as CustomAttributeProps["valueType"]:
      return (
        <RadioButton
          {...attribute}
          disabled={disabled}
        />
      );

    case Attribute.valueType.PHONE_NUMBER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.EMAIL as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputText {...attribute} disabled={disabled || attribute.disabled} />;

    case Attribute.valueType.NUMBER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER_POSITIVE as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER_ZERO_OR_POSITIVE as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.TIME as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber {...attribute} type="number" disabled={disabled || attribute.disabled} />;

    case Attribute.valueType.LONG_TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputArea {...attribute} disabled={disabled || attribute.disabled} />;

    case Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"]:
      return <DateInput {...attribute} disabled={disabled || attribute.disabled} />;

    case Attribute.valueType.TRUE_ONLY as unknown as CustomAttributeProps["valueType"]:
      return (
        <CheckInput
          {...attribute}
          disabled={disabled}
        />
      );

    case Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"]:
      return <SingleSelectField {...attribute} disabled={disabled || attribute.disabled} />;

    default:
      return <span>ValueType not mapped</span>;
  }
}

export default GenericFields;
