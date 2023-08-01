import React from "react";
import CheckInput from "./fields/CheckInput.js";
import DateInput from "./fields/DateInput.js";
import InputNumber from "./fields/InputNumber.js";
import InputText from "./fields/InputText.js";
import SingleSelectField from "./fields/SingleSelect.js";
import SwitchInput from "./fields/SwitchInput.js";
import InputArea from "./fields/InputArea.js";
import { type CustomAttributeProps } from "../../types/table/attributeColumns.js";
import { Attribute } from "../../types/generated/models.js";

interface GenericFieldsProps {
  attribute: CustomAttributeProps
  disabled: boolean
  valueType: CustomAttributeProps["valueType"]
}

function GenericFields({ attribute, disabled, valueType }: GenericFieldsProps) {
  switch (valueType) {
    case Attribute.valueType.BOOLEAN as unknown as CustomAttributeProps["valueType"]:
      return (
        <SwitchInput
          {...attribute}
          disabled={disabled}
        />
      );

    case Attribute.valueType.NUMBER as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber type="number" {...attribute} disabled={disabled} />;

    case Attribute.valueType.PHONE_NUMBER as unknown as CustomAttributeProps["valueType"]:
      return <InputText {...attribute} disabled={disabled} />;

    case Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputText {...attribute} disabled={disabled} />;

    case Attribute.valueType.LONG_TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputArea {...attribute} disabled={disabled} />;

    case Attribute.valueType.INTEGER as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber type="number" {...attribute} disabled={disabled} />;

    case Attribute.valueType.INTEGER_POSITIVE as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber type="number" {...attribute} disabled={disabled} />;

    case Attribute.valueType.INTEGER_ZERO_OR_POSITIVE as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber type="number" {...attribute} disabled={disabled} />;

    case Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"]:
      return <DateInput {...attribute} disabled={disabled} />;

    case Attribute.valueType.TIME as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber type="time" {...attribute} disabled={disabled} />;

    case Attribute.valueType.TRUE_ONLY as unknown as CustomAttributeProps["valueType"]:
      return (
        <CheckInput
          {...attribute}
          disabled={disabled}
        />
      );

    case Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"]:
      return <SingleSelectField {...attribute} optionSet={attribute.options} disabled={disabled} />;

    default:
      return <span>Campo não mapeado</span>;
  }
}

export default GenericFields;
