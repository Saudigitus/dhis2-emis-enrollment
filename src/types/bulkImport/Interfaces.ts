import type { ZodBoolean, ZodLiteral, ZodNumber, ZodString } from "zod";
import z from "zod";
export const ValueType: Record<string, ZodString | ZodBoolean | ZodNumber | ZodLiteral<true>> = {
    TEXT: z.string(),
    LONG_TEXT: z.string(),
    LETTER: z.string().length(1),
    PHONE_NUMBER: z.string(),
    EMAIL: z.string().email(),
    BOOLEAN: z.boolean(),
    TRUE_ONLY: z.literal(true),
    DATE: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})/),
    DATETIME: z
        .string()
        .regex(
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/
        ),
    TIME: z.string().regex(/^(\d{2}):(\d{2})/),
    NUMBER: z.number(),
    UNIT_INTERVAL: z.string(),
    PERCENTAGE: z.number().int().gte(0).lte(100),
    INTEGER: z.number().int(),
    INTEGER_POSITIVE: z.number().int().positive().min(1),
    INTEGER_NEGATIVE: z.number().int().negative(),
    INTEGER_ZERO_OR_POSITIVE: z.number().int().min(0),
    TRACKER_ASSOCIATE: z.string().regex(/^[A-Z][0-9A-Za-z]{10}$/),
    USERNAME: z.string(),
    COORDINATE: z.string(),
    ORGANISATION_UNIT: z.string().regex(/^[A-Za-z][0-9A-Za-z]{10}$/),
    REFERENCE: z.string().regex(/^[A-Za-z][0-9A-Za-z]{10}$/),
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
    valueType: keyof typeof ValueType,
    isTEAttribute: boolean
}
export type TemplateData = Array<Record<string, any>>
export type TemplateFieldMapping = Record<string, FieldMapping>
