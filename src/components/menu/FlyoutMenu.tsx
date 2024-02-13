import { MenuItem, FlyoutMenu } from "@dhis2/ui";
import React from "react";
import { Divider } from "@material-ui/core"
import { FlyoutComponentProps } from "../../types/buttons/FlyoutOptionsProps";

function FlyoutMenuComponent(props: FlyoutComponentProps): React.ReactElement {
  const { options } = props;
  return (
    <FlyoutMenu>
      {options.map((option: any, i: any) => (
        <>
          <MenuItem key={i} {...option}/>
          {option.divider === true && <Divider />}
        </>
      ))}
    </FlyoutMenu>
  );
}

export default FlyoutMenuComponent;
