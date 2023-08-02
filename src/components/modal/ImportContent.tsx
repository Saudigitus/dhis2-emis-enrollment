import React from "react";
import WithPadding from "../template/WithPadding";
import Subtitle from "../text/subtitle";

function ImportContent(): React.ReactElement {
  return (
    <div>
      <WithPadding>
        <Subtitle label={"Import modal content component"} />
        <WithPadding />
      </WithPadding>
    </div>
  );
}

export default ImportContent;
