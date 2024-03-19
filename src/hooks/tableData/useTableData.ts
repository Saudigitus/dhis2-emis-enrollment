
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema";
import useShowAlerts from "../commons/useShowAlert";
import { EventQueryProps, EventQueryResults } from "../../types/api/WithoutRegistrationProps";
import { TeiQueryProps, TeiQueryResults } from "../../types/api/WithRegistrationProps";
import { TableDataProps } from "../../types/table/TableContentProps";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { EventsState } from "../../schema/eventsSchema";
import { FormatResponseRowsProps } from "../../types/utils/FormatRowsDataProps";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            fields: "*",
            ...queryProps
        }
    }
})

const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,orgUnit,program]",
            ...queryProps
        }
    }
})


export function useTableData() {
    const engine = useDataEngine();
    const { program, registration } = getDataStoreKeys()
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const setEvents = useSetRecoilState(EventsState)
    const { urlParamiters } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])
    const { hide, show } = useShowAlerts()
    const school = urlParamiters().school as unknown as string

    async function getData(page: number, pageSize: number) {
        if (school !== null) {
            setLoading(true)

            const eventsResults = await engine.query(EVENT_QUERY({
                ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                page,
                pageSize,
                program: program as unknown as string,
                order: "createdAt:desc",
                programStage: registration?.programStage as unknown as string,
                filter: headerFieldsState?.dataElements,
                filterAttributes: headerFieldsState?.attributes,
                orgUnit: school
            })).catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }) as unknown as EventQueryResults;

            const trackedEntityToFetch = eventsResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")

            const teiResults = trackedEntityToFetch?.length > 0
                ? await engine.query(TEI_QUERY({
                    ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                    pageSize,
                    program: program as unknown as string,
                    orgUnit: school,
                    trackedEntity: trackedEntityToFetch
                })).catch((error) => {
                    show({
                        message: `${("Could not get data")}: ${error.message}`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 5000);
                }) as unknown as TeiQueryResults
                : { results: { instances: [] } } as unknown as TeiQueryResults

            setEvents(eventsResults?.results?.instances)
            setTableData(formatResponseRows({
                eventsInstances: eventsResults?.results?.instances as unknown as  FormatResponseRowsProps['eventsInstances'],
                teiInstances: teiResults?.results?.instances as unknown as  FormatResponseRowsProps['teiInstances']
            }));

            setLoading(false)
        }
    }

    return {
        getData,
        tableData,
        loading
    }
}
