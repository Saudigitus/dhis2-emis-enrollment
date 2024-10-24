import { eventUpdateBody } from "../events/formatPostBody";

export const teiUpdateBody = (enrollmentData: any[], orgUnit: string, trackedEntityType: string, trackedEntity: string, formValues: any, enrollmentDate: string, program: string, enrollment: string, events: any): any => {

    const buildAttributesBody = (enrollmentData: any[]) => {
        const attributes: any[] = []
        for (const data of enrollmentData) {
            if (data.length && data[0].type === "attribute") {
                data.forEach((attribute: any) => {
                    if (attribute.assignedValue !== undefined && attribute.assignedValue !== false && formValues.hasOwnProperty(attribute.id))
                        attributes.push({ attribute: attribute.id, value: attribute.assignedValue })

                    else
                        attributes.push({ attribute: attribute.id, value: undefined })
                });
            }
        }
        return attributes
    }

    const trackedEntities = [
        {
            orgUnit,
            trackedEntity,
            trackedEntityType,
            enrollments: [
                {
                    orgUnit,
                    program: program,
                    status: "COMPLETED",
                    enrollment: enrollment,
                    attributes: buildAttributesBody(enrollmentData),
                    createdAt: enrollmentDate,
                    occurredAt: enrollmentDate,
                    enrolledAt: enrollmentDate,
                    events: eventUpdateBody(enrollmentData, events, enrollmentDate, formValues, orgUnit, program, trackedEntity)
                }
            ]
        }
    ]

    return { trackedEntities }
}