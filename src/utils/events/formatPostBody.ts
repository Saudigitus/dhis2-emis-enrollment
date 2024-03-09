import { FormToPostType } from "../../types/form/FormToPostType";
import { reducer } from "../commons/formatDistinctValue";

export const eventUpdateBody = (enrollmentsData: any[], event: any[]) => {
    const updatedEvent = {...event}; // Create a copy of event array to avoid mutating the original array

    for (const dataValue of event['dataValues']) {
        const dataValueForm = enrollmentsData.find((x: any) => x.name === dataValue?.dataElement);
        if (dataValueForm) {
            const updatedDataValue = { dataElement: dataValueForm.name, value: dataValueForm.assignedValue };
            // Find the index of the dataValue in the event array and replace it with the updated dataValue
            const index = updatedEvent['dataValues'].findIndex((x: any) => x.dataElement === dataValueForm.name);
            if (index !== -1) {
                updatedEvent['dataValues'][index] = updatedDataValue;
            }
        }
    }

    return {
        events: [updatedEvent]
    };
};
