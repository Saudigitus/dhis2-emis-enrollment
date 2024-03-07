import React, {useState} from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../card/SummaryCard";
import {useRecoilValue} from "recoil";
import {ProcessingStage} from "../../schema/bulkImportSchema";

interface SummaryCardsProps {
    created: number
    updated: number
    conflicts: number
    duplicates: number
    invalid: number
}

function SummaryCards(values: SummaryCardsProps): React.ReactElement {
    const { created, conflicts, duplicates, invalid } = values;
    const processingStage: string = useRecoilValue<string>(ProcessingStage)
    return processingStage === "template-processing" ? (
        <ButtonStrip>
            <SummaryCard color="success" label="New students" value={created.toString()} />
            <SummaryCard color="secondary" label="Duplicates" value={duplicates.toString()} />
            {/* <SummaryCard color="error" label="Conflicts" value={conflicts.toString()} /> */}
            <SummaryCard color="error" label="Invalid Records" value={invalid.toString()} />
        </ButtonStrip>
    ) : (
        <ButtonStrip>
            <SummaryCard color="success" label="Imported" value={""} />
            <SummaryCard color="secondary" label="Updated" value={""} />
            <SummaryCard color="error" label="Ignored" value={""} />
            <SummaryCard color="secondary" label="Conflicts" value={""} />
        </ButtonStrip>
    )
}

export default SummaryCards;
