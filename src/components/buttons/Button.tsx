import { Button, ButtonStrip } from "@dhis2/ui";
import { InfoOutlined } from "@material-ui/icons";
import React from "react";

function SimpleButtons(): React.ReactElement {
  return (
    <ButtonStrip>
      <Button icon={<InfoOutlined />}>Simple button</Button>
      <Button primary>Simple button</Button>
      <Button icon={<InfoOutlined />} destructive>
        Simple button
      </Button>
      <Button icon={<InfoOutlined />} disabled>
        Simple button
      </Button>
    </ButtonStrip>
  );
}

export default SimpleButtons;
