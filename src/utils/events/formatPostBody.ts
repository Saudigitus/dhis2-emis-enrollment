import { format } from "date-fns";
import { reducer } from "../commons/formatDistinctValue";

export const eventUpdateBody = (enrollmentsData: any[], events: any[], eventDate: any, formValues: any, orgUnit: string, program: string, trackedEntity: string) => {
    const newEvents: any = []

    for (const enrollmentData of enrollmentsData) {
        if (enrollmentData[0].type === "dataElement") {
            for (const [key, value] of Object.entries(reducer(enrollmentData))) {

                const event = events?.find((event: any) => event.programStage === key)
                if (event && Object.keys(event).length > 4)
                    newEvents.push({
                        ...event,
                        occurredAt: format(new Date(eventDate), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
                        scheduledAt: format(new Date(eventDate), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
                        createdAt: format(new Date(eventDate), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
                        dataValues: returnEventDataValues(enrollmentData, formValues)
                    })
                else
                    newEvents.push({
                        notes: [],
                        orgUnit: orgUnit,
                        status: "COMPLETED",
                        programStage: key,
                        program: program,
                        trackedEntity: trackedEntity,
                        enrollment: event.enrollment,
                        occurredAt: format(new Date(eventDate), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
                        scheduledAt: format(new Date(eventDate), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
                        createdAt: format(new Date(eventDate), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
                        dataValues: returnEventDataValues(enrollmentData, formValues)
                    })
            }
        }
    }

    return newEvents
};

const returnEventDataValues = (enrollmentData: any[], formValues: any) => {
    return enrollmentData?.map((dataValue: any) => {
        if (dataValue.assignedValue !== undefined && dataValue.assignedValue !== false && formValues.hasOwnProperty(dataValue.id))
            return { dataElement: dataValue.id, value: dataValue.assignedValue }

        else
            return { dataElement: dataValue.id, value: undefined }
    })
}