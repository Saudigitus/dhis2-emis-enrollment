import { useDataEngine } from "@dhis2/app-runtime";
import { EventQueryProps, EventQueryResults } from "../../types/api/WithoutRegistrationProps";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import useShowAlerts from "../commons/useShowAlert";

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
    const { hide, show } = useShowAlerts()
    const { getDataStoreData } = getSelectedKey()

    async function getEvent(program: string, programStage: string, filter: string[], trackedEntity: string, fields: string, orgUnit?: string ) {
            return await engine.query(EVENT_QUERY({
                pageSize:10,
                program: program,
                programStage: programStage,
                filter: filter,
                orgUnit: orgUnit,
                trackedEntity: trackedEntity,
                order: getDataStoreData.defaults.defaultOrder || "occurredAt:desc",
                fields,
            })).catch((error) => {
                show({
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }) as unknown as EventQueryResults;
    }

    return { getEvent }
}
