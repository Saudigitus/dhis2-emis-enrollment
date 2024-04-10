import { reducer } from "../commons/formatDistinctValue";

export const eventUpdateBody = (enrollmentsData: any[], events: any[], eventDate: any,  formValues:any, orgUnit: string, programId: string, trackedEntity: string) => {
    const form : any = []

    for (const enrollmentData of enrollmentsData) {
        if (enrollmentData[0].type === "dataElement") {
            for (const [key, value] of Object.entries(reducer(enrollmentData))) {

                const event = events?.find((event: any) => event.programStage === key)

                if(event && Object.keys(event).length > 4)
                    form.push({
                        ...event,
                        occurredAt: eventDate,
                        scheduledAt: eventDate,
                        dataValues: returnEventDataValues(enrollmentData, formValues)
                    })
                else 
                    form.push({
                        notes: [],
                        orgUnit:orgUnit,
                        status: "ACTIVE",
                        programStage: key,
                        program: programId,
                        trackedEntity:trackedEntity,
                        enrollment: event.enrollment,
                        occurredAt: eventDate,
                        scheduledAt: eventDate,
                        dataValues: returnEventDataValues(enrollmentData, formValues)
                    })
            }
        }
    }

    return { events: form }
};

const returnEventDataValues =  (enrollmentData: any[], formValues: any) => {
    return enrollmentData?.map((dataValue: any) => {
        if (dataValue.assignedValue !== undefined && dataValue.assignedValue !== false && formValues.hasOwnProperty(dataValue.id))
            return { dataElement: dataValue.id, value: dataValue.assignedValue }
        
        else 
            return { dataElement: dataValue.id, value: undefined }
    })
}