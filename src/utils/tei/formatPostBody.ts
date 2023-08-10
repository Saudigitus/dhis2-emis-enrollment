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
                    program: programId,
                    programStage: key,
                    orgUnit,
                    dataValues: value
                })
            }
        }
    }

    return {
        orgUnit,
        trackedEntityType: "eMLK4VQm3Kj",
        attributes: form.attributes,
        enrollments: [{
            orgUnit,
            program: programId,
            events: form.events
        }]
    }
}
