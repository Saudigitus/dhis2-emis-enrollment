import { FormToPostType } from "../../types/form/FormToPostType";
import { reducer } from "../commons/formatDistinctValue";

export const teiUpdateBody = (enrollmentsData: any[], programId: string, orgUnit: string, enrollmentDate: string, programStagesToSave: string[], trackedEntityType: string, trackedEntityId:string ) => {
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

    programStagesToSave.forEach(programStageToSave => {
        form.events.push({
            occurredAt: enrollmentDate,
            notes: [],
            status: "ACTIVE",
            program: programId,
            programStage: programStageToSave,
            orgUnit,
            scheduledAt: enrollmentDate
        })
    })

    return {
        trackedEntities: [{
            attributes: form.attributes,
            trackedEntity: trackedEntityId,
            orgUnit: orgUnit,
            trackedEntityType: trackedEntityType,
        }]        
    }
}