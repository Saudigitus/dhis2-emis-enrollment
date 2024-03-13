import { reducer } from "../commons/formatDistinctValue";

export const eventUpdateBody = (enrollmentsData: any[], events: any[], enrollmentDate: any, formValues:any) => {
    const form : any = []

    for (const enrollmentData of enrollmentsData) {
        if (enrollmentData[0].type === "dataElement") {
            for (const [key, value] of Object.entries(reducer(enrollmentData))) {
                const event = events.find((event: any) => event.programStage === key)
                form.push({
                    ...event,
                    dataValues: enrollmentData?.map((dataValue: any) => {
                        if (dataValue.assignedValue !== undefined && dataValue.assignedValue !== false && formValues.hasOwnProperty(dataValue.id))
                            return { dataElement: dataValue.id, value: dataValue.assignedValue }
                        
                        else 
                            return { dataElement: dataValue.id, value: undefined }
                    })
                })
            }
        }
    }



    return { events: form }

};
