import { useDataEngine } from "@dhis2/app-runtime";
import { EventQueryProps, EventQueryResults } from "../../types/api/WithoutRegistrationProps";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            fields: "event,trackedEntity,enrollment,dataValues[dataElement,value],orgUnitName,orgUnit",
            ...queryProps
        }
    }
})

export function useGetEvent() {
    const engine = useDataEngine();

    async function getEvent(program: string, programStage: string, filter: string[], orgUnit: string, trackedEntity: string ) {
        console.log("trackedEntity", trackedEntity)
            return await engine.query(EVENT_QUERY({
                pageSize:10,
                program: program,
                programStage: programStage,
                filter: filter,
                orgUnit: orgUnit,
                trackedEntity: trackedEntity,
                order: "createdAt:desc"
            })) as unknown as EventQueryResults;
    }

    return { getEvent }
}
