import { MenuItem, FlyoutMenu } from "@dhis2/ui";
import React from "react";
import { Divider } from "@material-ui/core"
import {  FlyoutOptionsProps } from "../../types/common/components";

function FlyoutMenuComponent({ options}: {options: FlyoutOptionsProps[]}): React.ReactElement {
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
