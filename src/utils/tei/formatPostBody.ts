import { format } from "date-fns";
import { type formType } from "../../types/form/initialFormTypes";
import { reducer } from "../commons/formatDistinctValue";

export const teiPostBody = (enrollmentsData: any[], programId: string, orgUnit: string) => {
    const form: formType = {
        attributes: [],
        events: []
    }

    for (const enrollmentData of enrollmentsData) {
        if (enrollmentData[0].type === "attribute") {
            enrollmentData.forEach((attribute: any) => {
                if (attribute.value !== undefined) {
                    form.attributes.push({ attribute: attribute.id, value: attribute.value })
                }
            });
        } else if (enrollmentData[0].type === "dataElement") {
            for (const [key, value] of Object.entries(reducer(enrollmentData))) {
                form.events.push({
                    occurredAt: format(new Date(), "yyyy-MM-dd"),
                    notes: [],
                    status: "ACTIVE",
                    program: programId,
                    programStage: key,
                    orgUnit,
                    scheduledAt: format(new Date(), "yyyy-MM-dd"),
                    dataValues: value
                })
            }
        }
    }

    return {
        trackedEntities: [
            {
                enrollments: [
                    {
                        occurredAt: null,
                        enrolledAt: format(new Date(), "yyyy-MM-dd"),
                        program: programId,
                        orgUnit,
                        attributes: form.attributes,
                        status: "ACTIVE",
                        events: form.events
                    }
                ],
                orgUnit,
                trackedEntityType: "eMLK4VQm3Kj"
            }
        ]
    }
}
