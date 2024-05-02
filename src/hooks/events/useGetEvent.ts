import { useDataEngine } from "@dhis2/app-runtime";
import { EventQueryProps, EventQueryResults } from "../../types/api/WithoutRegistrationProps";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            ...queryProps
        }
    }
})

export function useGetEvent() {
    const engine = useDataEngine();

    async function getEvent(program: string, programStage: string, filter: string[], orgUnit: string, trackedEntity: string, fields: string ) {
            return await engine.query(EVENT_QUERY({
                pageSize:10,
                program: program,
                programStage: programStage,
                filter: filter,
                orgUnit: orgUnit,
                trackedEntity: trackedEntity,
                order: "createdAt:desc",
                fields,
            })) as unknown as EventQueryResults;
    }

    return { getEvent }
}
