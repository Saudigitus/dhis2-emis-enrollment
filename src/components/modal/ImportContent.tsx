import React from "react";
import WithPadding from "../template/WithPadding";
import Subtitle from "../text/subtitle";
import {
    ModalActions,
    Button,
    ButtonStrip,
    Divider
  } from "@dhis2/ui";

interface ContentProps {
    setOpen: (value: boolean) => void
  }

function ImportContent({ setOpen }: ContentProps): React.ReactElement {
  const modalActions = [
    { label: "Cancel", disabled: false, loading: false, onClick: () => { setOpen(false) } },
    { label: "Import", primary: true, disabled: false, loading: false, onClick: () => { setOpen(false) } }
  ];

  return (
    <div>
      <WithPadding>
        <Subtitle label={"Import modal content component"} />
        <Divider />
      </WithPadding>

      <ModalActions>
        <ButtonStrip end>
          {modalActions.map((action, i) => (
            <Button
              key={i}
              {...action}
            >
              {action.loading ? "Loading..." : action.label}
            </Button>
          ))}
        </ButtonStrip>
      </ModalActions>
    </div>
  );
}

export default ImportContent;
