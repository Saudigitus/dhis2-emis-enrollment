import React from "react";
import { SimpleButtons, DropdownButtonComponent, WithPadding } from "../../components";
import { IconUserGroup16, IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import { enrollmentOptions } from "../../components/buttons/options";

function Buttons(): React.ReactElement {
  return (
    <WithPadding>
      <SimpleButtons />
      <br />
      <ButtonStrip>
        <Button icon={<IconAddCircle24 />}>Enrol single student</Button> <br /> <br />
        <DropdownButtonComponent
          name="Bulk enrollment"
          icon={<IconUserGroup16 />}
          options={enrollmentOptions}
        />
      </ButtonStrip>
    </WithPadding>
  );
}

export default Buttons;
