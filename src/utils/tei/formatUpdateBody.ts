import { FormToPostType } from "../../types/form/FormToPostType";

export const teiUpdateBody = (enrollmentsData: any[], orgUnit: string, trackedEntityType: string, trackedEntityId:string, formValues: any ) => {
    const form: FormToPostType = {
        attributes: [],
        events: []
    }

    for (const enrollmentData of enrollmentsData) {
        if (enrollmentData[0].type === "attribute") {
            
            enrollmentData.forEach((attribute: any) => {
                if (attribute.assignedValue !== undefined && attribute.assignedValue !== false && formValues.hasOwnProperty(attribute.id))
                    form.attributes.push({ attribute: attribute.id, value: attribute.assignedValue })

                else 
                    form.attributes.push({ attribute: attribute.id, value: undefined })
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
