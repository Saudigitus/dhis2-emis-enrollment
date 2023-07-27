import React, { useState } from "react";
import SimpleDropdownButton from "./SimpleDropdownButton";
import SimpleButton from "./SimpleButton";
import { type SimpleButtonsProps } from "../../../types/Buttons/GroupedButtons";

export default function SwitchButtonView(): React.ReactElement {
  const [selectedTerm, setSelectedTerm] = useState<string>();

  const items: SimpleButtonsProps[] = [
    { id: "term1", label: "Term 1", type: "progarmStage" },
    { id: "term2", label: "Term 2", type: "progarmStage" },
    { id: "term4", label: "Term 4", type: "progarmStage" }
  ];

  return (
    <div>
      {items.length > 3 ? <SimpleDropdownButton items={items} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} /> : <SimpleButton items={items} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />}
    </div>
  );
}
