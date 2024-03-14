import { useDataEngine } from "@dhis2/app-runtime";
import useShowAlerts from '../commons/useShowAlert';
import { EventQueryProps, EventQueryResults } from "../../types/api/WithoutRegistrationProps";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            fields: "*",
            ...queryProps
        }
    }
})

export function useGetEvent() {
    const engine = useDataEngine();
    const { hide, show } = useShowAlerts()

    async function getEvent(program: string, programStage: string, filter: string[], orgUnit: string, trackedEntity: string ) {
            return await engine.query(EVENT_QUERY({
                pageSize:10,
                programStatus: "ACTIVE",
                program: program,
                programStage: programStage,
                filter: filter,
                orgUnit: orgUnit,
                trackedEntity: trackedEntity
            })).catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }) as unknown as EventQueryResults;
    }

    return { getEvent }
}
