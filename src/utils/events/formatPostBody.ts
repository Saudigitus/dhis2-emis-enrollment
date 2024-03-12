import { reducer } from "../commons/formatDistinctValue";

export const eventUpdateBody = (enrollmentsData: any[], events: any[], enrollmentDate: any, programId: string, orgUnit: string) => {
    const form : any = []

    for (const enrollmentData of enrollmentsData) {
        if (enrollmentData[0].type === "dataElement") {
            for (const [key, value] of Object.entries(reducer(enrollmentData))) {
                const event = events.find((event: any) => event.programStage === key)
                form.push({
                    ...event,
                    dataValues: value
                })
            }
        }
    }



    return { events: form }

};
