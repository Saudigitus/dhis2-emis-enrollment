
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema";
import useShowAlerts from "../commons/useShowAlert";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import { type EventQueryProps, type EventQueryResults, type TeiQueryProps, type TeiQueryResults } from "../../types/common/components";

type TableDataProps = Record<string, string>;

const EVENT_QUERY = ({ ouMode, page, pageSize, program, order, programStage, filter, orgUnit, filterAttributes, programStatus }: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            order,
            page,
            pageSize,
            programStatus,
            ouMode,
            program,
            programStage,
            orgUnit,
            filter,
            filterAttributes,
            fields: "*"
        }
    }
})

const TEI_QUERY = ({ ouMode, pageSize, program, trackedEntity, orgUnit, order }: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            program,
            order,
            ouMode,
            pageSize,
            trackedEntity,
            orgUnit,
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,orgUnit,program]"
        }
    }
})


export function useTableData() {
    const engine = useDataEngine();
    const { getDataStoreData } = getSelectedKey()
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const { urlParamiters } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])
    const { hide, show } = useShowAlerts()
    const school = urlParamiters().school as unknown as string

    async function getData(page: number, pageSize: number) {
        if (school !== null) {
            setLoading(true)

            const eventsResults: EventQueryResults = await engine.query(EVENT_QUERY({
                ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                page,
                pageSize,
                program: getDataStoreData?.program as unknown as string,
                order: "createdAt:desc",
                programStatus: "ACTIVE",
                programStage: getDataStoreData?.registration?.programStage as unknown as string,
                filter: headerFieldsState?.dataElements,
                filterAttributes: headerFieldsState?.attributes,
                orgUnit: school
            })).catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            })

            const trackedEntityToFetch = eventsResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")

            const teiResults: TeiQueryResults = trackedEntityToFetch?.length > 0
                ? await engine.query(TEI_QUERY({
                    ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                    order: "created:desc",
                    pageSize,
                    program: getDataStoreData?.program as unknown as string,
                    orgUnit: school,
                    trackedEntity: trackedEntityToFetch
                })).catch((error) => {
                    show({
                        message: `${("Could not get data")}: ${error.message}`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 5000);
                })
                : { results: { instances: [] } }

            setTableData(formatResponseRows({
                eventsInstances: eventsResults?.results?.instances,
                teiInstances: teiResults?.results?.instances
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
