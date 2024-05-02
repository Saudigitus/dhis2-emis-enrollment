import z, {ZodBoolean, ZodEffects, ZodLiteral, ZodNumber, ZodString} from "zod";
import {TrackedEntity} from "../../schema/trackerSchema";
export const ValueType: Record<string, ZodString | ZodBoolean | ZodNumber | ZodLiteral<true> | ZodEffects<ZodNumber, number, unknown>> = {
    TEXT: z.string(),
    LONG_TEXT: z.string(),
    LETTER: z.string().length(1),
    PHONE_NUMBER: z.string(),
    EMAIL: z.string().email(),
    BOOLEAN: z.string().regex(/^(True|False|Yes|No)$/i),
    TRUE_ONLY: z.literal(true),
    DATE: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})/, {message: "Invalid date"}),
    DATETIME: z
        .string()
        .regex(
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/
        ),
    TIME: z.string().regex(/^(\d{2}):(\d{2})/),
    NUMBER: z.preprocess(Number, z.number()),
    UNIT_INTERVAL: z.string(),
    PERCENTAGE: z.preprocess(Number, z.number().int().gte(0).lte(100)),
    INTEGER: z.preprocess(Number, z.number().int()),
    INTEGER_POSITIVE: z.preprocess(Number, z.number().int().positive().min(1)),
    INTEGER_NEGATIVE: z.preprocess(Number, z.number().int().negative()),
    INTEGER_ZERO_OR_POSITIVE: z.preprocess(Number, z.number().int().min(0)),
    TRACKER_ASSOCIATE: z.string().regex(/^[A-Z][0-9A-Za-z]{10}$/, {message: "Invalid UID"}),
    USERNAME: z.string(),
    COORDINATE: z.string(),
    ORGANISATION_UNIT: z.string().regex(/^[A-Za-z][0-9A-Za-z]{10}$/, {message: "Invalid OrgUnit UID"}),
    REFERENCE: z.string().regex(/^[A-Za-z][0-9A-Za-z]{10}$/, {message: "Invalid UID"}),
    AGE: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})/),
    URL: z.string().url(),
    FILE_RESOURCE: z.string(),
    IMAGE: z.string(),
    GEOJSON: z.string(),
    MULTI_TEXT: z.string()
};

export interface FieldMapping {
    key: string
    id: string
    name: string
    required: boolean
    valueType: keyof typeof ValueType
    isTEAttribute: boolean
}
export type TemplateData = Array<Record<string, any>>
export type TemplateFieldMapping = Record<string, FieldMapping>
export type PaginationState = Record<string, { page: number, pageSize: number }>;

export interface Stats {
    created: number
    deleted: number
    ignored: number
    total: number
    updated: number
    conflicts?: number
    invalid?: number
}

export interface ApiResponse {
    status: string
    validationReport: ValidationReport
    stats: Stats
    bundleReport?: BundleReport
}

export interface ValidationReport {
    errorReports: any[]
    warningReports: any[]
}

export interface BundleReport {
    status: string
    typeReportMap: TypeReportMap
    stats: Stats
}

interface TypeReportMap {
    TRACKED_ENTITY: TypeReport
    RELATIONSHIP: TypeReport
    EVENT: TypeReport
    ENROLLMENT: TypeReport
}

interface TypeReport {
    trackerType: string
    stats: Stats
    objectReports: ObjectReport[]
}

interface ObjectReport {
    trackerType: string
    uid: string
    index: number
    errorReports: any[]
}

export interface NestedTrackerPayload {
    trackedEntities: TrackedEntity[]
}

export interface createMutationParams {
    async: boolean
    importMode: "VALIDATE" | "COMMIT"
}
