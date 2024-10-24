import {BundleReport, FieldMapping, Stats, TemplateData} from "../types/bulkImport/Interfaces";
import {atom} from "recoil";
import {TrackedEntity} from "./trackerSchema";
import {TrackerReport_Stats, ValidationReport} from "../types/generated";

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

export interface BulkImportResponseStats {
    status: string
    stats: TrackerReport_Stats
    validationReport: ValidationReport
    bundleReport?: BundleReport
}
export const BulkImportResponseStatsState = atom<BulkImportResponseStats>({
    key: "BulkImport-Response-Stats",
    default: {
        status: "PENDING",
        stats: {created: 0, updated: 0, ignored: 0, total: 0, deleted: 0},
        validationReport: {errorReports: [], warningReports: []}
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
    forUpdate?: boolean
}

export const ProcessingRecordsState = atom<ProcessingRecords>({
    key: "processing-records-state",
    default: {
        validRecords: [],
        invalidRecords: [],
        newRecords: [],
        recordsToUpdate: [],
        mandatoryFields: [],
        forUpdate: false
    }
})

export type Headings = Record<string, string>
export const TemplateHeadingsState = atom<Headings>({
    key: "template-headings",
    default: {}
})

export const ProcessingStage = atom<string>({
    key: "bulkimport-processing-stage",
    default: "template-processing"
})
