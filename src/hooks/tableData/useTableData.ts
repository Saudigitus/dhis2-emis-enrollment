
import { useRecoilValue } from "recoil";
import { DataStoreState } from "../../schema/dataStoreSchema";
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";

interface GetDataProps {
    page: number
    pageSize: number
    eventFilters: any
    teiFilters: any
}

type TableDataProps = Record<string, string>;

interface EventQueryProps {
    page: number
    pageSize: number
    ouMode: string
    program: string
    order: string
    programStage: string
    filter: string
    orgUnit: string
    filterAttributes: string
}

interface TeiQueryProps {
    program: string
    pageSize: number
    ouMode: string
    trackedEntity: string
    orgUnit: string
}

const EVENT_QUERY = ({ ouMode, page, pageSize, program, order, programStage, filter, orgUnit, filterAttributes }: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            order,
            page,
            pageSize,
            ouMode,
            program,
            programStage,
            orgUnit,
            // filter,
            fields: "*"
        }
    }
})

const TEI_QUERY = ({ ouMode, pageSize, program, trackedEntity, orgUnit }: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            program,
            ouMode,
            pageSize,
            trackedEntity,
            orgUnit,
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,status,orgUnit,enrolledAt]"
        }
    }
})

interface dataValuesProps {
    dataElement: string
    value: string
}

interface attributesProps {
    attribute: string
    value: string
}

interface EventQueryResults {
    results: {
        instances: [{
            trackedEntity: string
            dataValues: dataValuesProps[]
        }]
    }
}

interface TeiQueryResults {
    results: {
        instances: [{
            trackedEntity: string
            attributes: attributesProps[]
        }]
    }
}

export function useTableData() {
    const engine = useDataEngine();
    const dataStoreState = useRecoilValue(DataStoreState);
    const { urlParamiters } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])

    const school = urlParamiters().school as unknown as string

    async function getData() {
        setLoading(true)
        
        const eventsResults: EventQueryResults = await engine.query(EVENT_QUERY({
            ouMode: "SELECTED",
            page: 1,
            pageSize: 10,
            program: dataStoreState?.enrollment.program as unknown as string,
            order: "createdAt:desc",
            programStage: dataStoreState?.enrollment.programStage as unknown as string,
            filter: "",
            filterAttributes: "",
            orgUnit: school
        }))

        const teiResults: TeiQueryResults = await engine.query(TEI_QUERY({
            ouMode: "SELECTED",
            pageSize: 10,
            program: dataStoreState?.enrollment.program as unknown as string,
            orgUnit: school,
            trackedEntity: eventsResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")
        }));

        setTableData(formatResponseRows({
            eventsInstances: eventsResults?.results?.instances,
            teiInstances: teiResults?.results?.instances
        }));

        setLoading(false)
    }

    return {
        getData,
        tableData,
        loading
    }
}
