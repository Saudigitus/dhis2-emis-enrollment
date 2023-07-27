import React, { useState } from "react";
import SimpleDropdownButton from "./SimpleDropdownButton";
import SimpleButton from "./SimpleButton";
import { type SimpleButtonsProps } from "../../../types/Buttons/SimpleButtonsProps";

const items: SimpleButtonsProps[] = [
  { id: "term1", label: "Term 1", type: "progarmStage" },
  { id: "term2", label: "Term 2", type: "progarmStage" },
  { id: "term3", label: "Term 3", type: "progarmStage" }
];

export default function SwitchButtonView(): React.ReactElement {
  const [selectedTerm, setSelectedTerm] = useState<object>(items[0]);

  return (
    <div>
      {items.length > 3 ? <SimpleDropdownButton items={items} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} /> : <SimpleButton items={items} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />}
    </div>
  );
}
