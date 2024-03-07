import {FieldMapping, Stats, TemplateData} from "../types/bulkImport/Interfaces";
import {atom} from "recoil";
import {TrackedEntity} from "./trackerSchema";

export const UploadProcessingStatusState = atom<boolean>({
    key: "enrollment-upload-processing-status",
    default: false
})

export interface BulkImportStats {
    teis: Stats
    // enrollments: Stats
    // events: Stats
}
export const BulkImportStatsState = atom<BulkImportStats>({
    key: "BulkImport-Enrollments-Stats",
    default: {
        teis: {created: 0, updated: 0, deleted: 0, ignored: 0, total: 0, conflicts: 0, invalid: 0}
        // enrollments: {created: 0, updated: 0, deleted: 0, ignored: 0, total: 0},
        // events: {created: 0, updated: 0, deleted: 0, ignored: 0, total: 0}
    }
})

export interface ProcessingRecords {
    validRecords: TemplateData
    invalidRecords: TemplateData
    newRecords: TemplateData
    recordsToUpdate: TemplateData
    mandatoryFields: FieldMapping[] // Will help in displaying records for review
    newTrackedEntities?: TrackedEntity[]
    updateTrackedEntities?: TrackedEntity[]
}

export const ProcessingRecordsState = atom<ProcessingRecords>({
    key: "processing-records-state",
    default: {
        validRecords: [],
        invalidRecords: [],
        newRecords: [],
        recordsToUpdate:[],
        mandatoryFields: []
    }
})

export type Headings = Record<string, string>
export const TemplateHeadingsState = atom<Headings>({
    key: "template-headings",
    default: {}
})

export const teiRefetch = atom({
    key: "refetch-tei",
    default: false
})

export const ProcessingStage = atom<string>({
    key: "bulkimport-processing-stage",
    default: "template-processing"
})
