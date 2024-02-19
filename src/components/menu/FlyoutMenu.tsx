import { MenuItem, FlyoutMenu } from "@dhis2/ui";
import React from "react";
import { Divider } from "@material-ui/core"
import { type FlyoutComponentProps } from "../../types/buttons/FlyoutOptionsProps";

function FlyoutMenuComponent(props: FlyoutComponentProps): React.ReactElement {
  const { options } = props;
  return (
    <FlyoutMenu>
      {options.map((option: any) => (
        <>
          <MenuItem key={option.label} {...option}/>
          {(option.divider === true && options.length > 1) && <Divider />}
        </>
      ))}
    </FlyoutMenu>
  );
}

export default FlyoutMenuComponent;
