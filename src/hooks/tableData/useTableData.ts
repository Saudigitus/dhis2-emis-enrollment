import { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema";
import useShowAlerts from "../commons/useShowAlert";
import { EventQueryProps } from "../../types/api/WithoutRegistrationProps";
import { TeiQueryProps } from "../../types/api/WithRegistrationProps";
import { TableDataProps } from "../../types/table/TableContentProps";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { EventsState } from "../../schema/eventsSchema";
import { FormatResponseRowsProps } from "../../types/utils/FormatRowsDataProps";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import { makeCancellablePromise } from "../../utils/commons/requestBroker";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            fields: queryProps?.fields ?? "*",
            ...queryProps
        }
    }
})

const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,orgUnit,program,status],programOwners[orgUnit]",
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
    const { getDataStoreData } = getSelectedKey()
    const school = urlParamiters().school as unknown as string
    const promisesRef = useRef<any[]>([]);

    function cancelAllOperations() {
        promisesRef.current.forEach((promise) => promise.cancel && promise.cancel());
        promisesRef.current = [];
    }

    async function getData(page: number, pageSize: number) {

        if (school !== null) {
            setLoading(true)
            cancelAllOperations();
            try {
                const eventsResults = makeCancellablePromise(
                    engine.query(EVENT_QUERY({
                        ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                        page,
                        pageSize,
                        program: program as unknown as string,
                        order: getDataStoreData.defaults.defaultOrder || "occurredAt:desc",
                        programStage: registration?.programStage as unknown as string,
                        filter: headerFieldsState?.dataElements,
                        filterAttributes: headerFieldsState?.attributes,
                        orgUnit: school
                    })).catch((error) => {
                        show({
                            message: `${("Could not get events")}: ${error.message}`,
                            type: { critical: true }
                        });
                        setTimeout(hide, 5000);
                    })
                ) as unknown as any

                promisesRef.current.push(eventsResults);

                const eventsResultsResponse = await eventsResults
                const trackedEntityToFetch = eventsResultsResponse?.results?.instances
                    ?.map((x: { trackedEntity: string }) => x.trackedEntity)
                    .join(';');

                const teiResults = trackedEntityToFetch?.length > 0 && makeCancellablePromise(
                    engine.query(TEI_QUERY({
                        ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                        pageSize,
                        program: program as unknown as string,
                        trackedEntity: trackedEntityToFetch,
                    })).catch((error) => {
                        show({
                            message: `${("Could not get traked entities")}: ${error.message}`,
                            type: { critical: true }
                        });
                        setTimeout(hide, 5000);
                    })
                )

                promisesRef.current.push(teiResults);

                const teiResultsResponse = trackedEntityToFetch?.length > 0 ? await teiResults : [{ results: { instances: [] } }]

                setEvents(eventsResultsResponse?.results?.instances)
                setTableData(formatResponseRows({
                    eventsInstances: eventsResultsResponse?.results?.instances as unknown as FormatResponseRowsProps['eventsInstances'],
                    teiInstances: teiResultsResponse?.results?.instances as unknown as FormatResponseRowsProps['teiInstances']
                }));

                setLoading(false)
            } catch (error) {
                return;
            }
        }
    }

    return {
        getData,
        tableData,
        loading
    }
}
