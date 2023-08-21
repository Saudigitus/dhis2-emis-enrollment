import { z } from "zod";

const StatusSchema = z.string(); // You need to define the actual Status type
const EventStatusSchema = z.string(); // You need to define the actual EventStatus type

export const UserSchema = z.object({
    uid: z.string(),
    username: z.string(),
    firstName: z.string().optional(),
    surName: z.string().optional()
});

const EventItemSchema = z.object({
    event: z.string()
});

const TrackedEntityItemSchema = z.object({
    trackedEntity: z.string()
});

const EnrollmentItemSchema = z.object({
    enrollment: z.string()
});

const NoteSchema = z.object({
    note: z.string().optional(),
    value: z.string(),
    storedAt: z.string().optional(),
    storedBy: z.string().optional(),
    createdBy: z.string().optional()
});

const FromItemSchema = z.object({
    event: EventItemSchema.optional(),
    enrollment: EnrollmentItemSchema.optional(),
    trackedEntity: TrackedEntityItemSchema.optional()
});

const ToItemSchema = z.object({
    event: EventItemSchema.optional(),
    enrollment: EnrollmentItemSchema.optional(),
    trackedEntity: TrackedEntityItemSchema.optional()
});

export const RelationshipSchema = z.object({
    relationship: z.string().optional(),
    relationshipType: z.string(),
    relationshipName: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    bidirectional: z.boolean().optional(),
    from: FromItemSchema,
    to: ToItemSchema
});

export const DataValueSchema = z.object({
    dataElement: z.string(),
    value: z.string().or(z.number()).optional(),
    providedElseWhere: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    storedBy: z.string().optional(),
    createdBy: z.string().optional()
});
export type DataValue = z.infer<typeof DataValueSchema>;

export const EventSchema = z.object({
    event: z.string().optional(),
    programStage: z.string(),
    enrollment: z.string().optional(),
    program: z.string().optional(),
    trackedEntity: z.string().optional(),
    status: EventStatusSchema.optional(),
    enrollmentStatus: z.string().optional(),
    orgUnit: z.string(),
    orgUnitName: z.string().optional(),
    createdAt: z.string().optional(),
    createdAtClient: z.string().optional(),
    updatedAt: z.string().optional(),
    updatedAtClient: z.string().optional(),
    scheduledAt: z.string().optional(),
    occurredAt: z.string(),
    completedAt: z.string().optional(),
    completedBy: z.string().optional(),
    followUp: z.boolean().optional(),
    deleted: z.boolean().optional(),
    geometry: z.string().optional(),
    storedBy: z.string().optional(),
    createdBy: UserSchema.optional(),
    updatedBy: UserSchema.optional(),
    attributeOptionCombo: z.string().optional(),
    attributeCategoryOptions: z.string().optional(),
    assignedUser: z.string().optional(),
    dataValues: z.array(DataValueSchema).optional(),
    relationships: z.array(RelationshipSchema).optional(),
    notes: z.array(NoteSchema).optional()
});
export type ProgramEvent = z.infer<typeof EventSchema>;

export const AttributeSchema = z.object({
    attribute: z.string(),
    code: z.string().optional(),
    displayName: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    storedBy: z.string().optional(),
    valueType: z.string().optional(),
    value: z.string().or(z.number()).optional()
});
export type Attribute = z.infer<typeof AttributeSchema>;
export const EnrollmentSchema = z.object({
    enrollment: z.string().optional(),
    program: z.string(),
    trackedEntity: z.string().optional(),
    trackedEntityType: z.string().optional(),
    status: StatusSchema.optional(),
    orgUnit: z.string(),
    orgUnitName: z.string().optional(),
    // enrolledAt: z.instanceof(Date),
    enrolledAt: z.string(),
    occurredAt: z.string().optional().nullable(),
    completedAt: z.string().optional(),
    completedBy: z.string().optional(),
    followUp: z.boolean().optional(),
    deleted: z.boolean().optional(),
    geometry: z.string().optional(),
    storedBy: z.string().optional(),
    createdBy: UserSchema.optional(),
    updatedBy: UserSchema.optional(),
    attributes: z.array(AttributeSchema).optional(),
    events: z.array(EventSchema).optional(),
    relationships: z.array(RelationshipSchema).optional(),
    notes: z.array(NoteSchema).optional()
});

export type Enrollment = z.infer<typeof EnrollmentSchema>;
export const TrackedEntitySchema = z.object({
    trackedEntity: z.string().optional(),
    trackedEntityType: z.string(),
    createdAt: z.string().optional(),
    createdAtClient: z.string().optional(),
    updatedAt: z.string().optional(),
    updatedAtClient: z.string().optional(),
    orgUnit: z.string(),
    inactive: z.boolean().optional(),
    deleted: z.boolean().optional(),
    geometry: z.string().optional(),
    attributes: z.array(AttributeSchema).optional(),
    enrollments: z.array(EnrollmentSchema).optional(),
    storedBy: z.string().optional(),
    createdBy: UserSchema.optional(),
    updatedBy: UserSchema.optional()
});
export type TrackedEntity = z.infer<typeof TrackedEntitySchema>;

// Usage examples:
// const trackedEntityInstance = TrackedEntitySchema.parse({
//     // ... your tracked entity data here
// });
//
// const enrollmentInstance = EnrollmentSchema.parse({
//     // ... your enrollment data here
// });
//
// const eventInstance = EventSchema.parse({
//     // ... your event data here
// });
