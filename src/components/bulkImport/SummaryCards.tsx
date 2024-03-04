import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../card/SummaryCard";

interface SummaryCardsProps {
    created: number
    updated: number
    conflicts: number
    duplicates: number
    invalid: number
}

function SummaryCards(values: SummaryCardsProps): React.ReactElement {
    const { created, conflicts, duplicates, invalid } = values;
    return (
        <ButtonStrip>
            <SummaryCard color="success" label="New students" value={created.toString()} />
            <SummaryCard color="secondary" label="Duplicates" value={duplicates.toString()} />
            <SummaryCard color="error" label="Conflicts" value={conflicts.toString()} />
            <SummaryCard color="secondary" label="Invalid Records" value={invalid.toString()} />
        </ButtonStrip>
    );
}

export default SummaryCards;
