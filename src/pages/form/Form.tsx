import React from "react";
import { Divider } from "@dhis2/ui";
import {
  EventGenericForm,
  TEIGenericForm,
  WithPadding
} from "../../components";

const programId: string = "wQaiD2V27Dp"
const programStageId: string = "bQxV9SA61IG"

function GenericForm(): React.ReactElement {
  return (
    <WithPadding>
      <TEIGenericForm programId={programId} />
      <Divider />
      <EventGenericForm programStageId={programStageId} />
    </WithPadding>
  );
}
export default GenericForm;
