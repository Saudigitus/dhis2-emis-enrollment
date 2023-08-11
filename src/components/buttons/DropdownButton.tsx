import { SplitButton } from "@dhis2/ui";
import React from "react";
import FlyoutMenuComponent from "../menu/FlyoutMenu.js";
import { type FlyoutOptionsProps } from "../../types/buttons/FlyoutOptions.js";

interface ButtonProps {
  name: string
  icon?: React.ReactNode
  options: FlyoutOptionsProps[]
  disabled: boolean
}
function DropdownButtonComponent(props: ButtonProps): React.ReactElement {
  const { name, icon, options, disabled } = props;

  return (
    <SplitButton
      disabled={disabled}
      icon={icon}
      component={<FlyoutMenuComponent options={options} />}
    >
      {name}
    </SplitButton>
  );
}

export default DropdownButtonComponent;
