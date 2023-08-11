import { type formType } from "../../types/form/initialFormTypes";
import { reducer } from "../commons/formatDistinctValue";
import { performanceProgramStages } from "../constants/enrollmentForm/performanceProgramStages";

export const teiPostBody = (enrollmentsData: any[], programId: string, orgUnit: string, enrollmentDate: string) => {
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
                    occurredAt: enrollmentDate,
                    notes: [],
                    status: "ACTIVE",
                    program: programId,
                    programStage: key,
                    orgUnit,
                    scheduledAt: enrollmentDate,
                    dataValues: value
                })
            }
        }
    }

    performanceProgramStages.forEach(performanceProgramStage => {
        form.events.push({
            occurredAt: enrollmentDate,
            notes: [],
            status: "ACTIVE",
            program: programId,
            programStage: performanceProgramStage,
            orgUnit,
            scheduledAt: enrollmentDate
        })
    })

    return {
        trackedEntities: [
            {
                enrollments: [
                    {
                        occurredAt: null,
                        enrolledAt: enrollmentDate,
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
