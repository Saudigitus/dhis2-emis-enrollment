import { FormToPostType } from "../../types/form/FormToPostType";

export const teiUpdateBody = (enrollmentsData: any[], programId: string, orgUnit: string, enrollmentDate: string, trackedEntityType: string, trackedEntityId:string ) => {
    const form: FormToPostType = {
        attributes: [],
        events: []
    }

    for (const enrollmentData of enrollmentsData) {
        if (enrollmentData[0].type === "attribute") {
            enrollmentData.forEach((attribute: any) => {
                if (attribute.assignedValue !== undefined && attribute.assignedValue !== false) {
                    form.attributes.push({ attribute: attribute.id, value: attribute.assignedValue })
                }
            });
        }
    }

    return {
        trackedEntities: [{
            attributes: form.attributes,
            trackedEntity: trackedEntityId,
            orgUnit: orgUnit,
            trackedEntityType: trackedEntityType,
        }]        
    }
}
