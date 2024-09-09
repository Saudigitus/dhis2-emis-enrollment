import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../card/SummaryCard";
import {useRecoilValue} from "recoil";
import {
    BulkImportResponseStats,
    BulkImportResponseStatsState,
    ProcessingRecords,
    ProcessingRecordsState,
    ProcessingStage
} from "../../schema/bulkImportSchema";

interface SummaryCardsProps {
    created: number
    updated: number
    conflicts: number
    duplicates: number
    invalid: number
}

function SummaryCards(values: SummaryCardsProps): React.ReactElement {
    const { created, duplicates, invalid } = values;
    const processingStage: string = useRecoilValue<string>(ProcessingStage)
    const processedRecords: ProcessingRecords = useRecoilValue<ProcessingRecords>(ProcessingRecordsState)
    const bulkImportResponseStats: BulkImportResponseStats = useRecoilValue<BulkImportResponseStats>(BulkImportResponseStatsState)
    const forUpdate = processedRecords?.forUpdate as boolean
    return processingStage === "template-processing"
        ? (
        <ButtonStrip>
            { !forUpdate && (
                <SummaryCard color="success" label="New students" value={created.toString()} />
            )}
                <SummaryCard color="secondary" label={!forUpdate ? "Duplicates" : "Updates"} value={duplicates.toString()} />
                <SummaryCard color="error" label="Invalid Records" value={invalid.toString()} />
        </ButtonStrip>)
        : (
        <ButtonStrip>
            <SummaryCard color="success" label="Imported" value={bulkImportResponseStats.stats.created.toString()} />
            <SummaryCard color="secondary" label="Updated" value={bulkImportResponseStats.stats.updated.toString()} />
            <SummaryCard color="error" label="Ignored" value={bulkImportResponseStats.stats.ignored.toString()} />
            <SummaryCard color="secondary" label="Conflicts" value={bulkImportResponseStats.validationReport.errorReports.length.toString()} />
        </ButtonStrip>
        )
}

export default SummaryCards;
