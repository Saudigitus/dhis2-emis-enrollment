
import { useSetRecoilState } from "recoil";
import { TableDataState } from "../../schema/tableData";
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatResponseRows } from "../../utils/table/rows/formatResponseRows";

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
}

interface TeiQueryProps {
    program: string
    pageSize: number
    ouMode: string
    trackedEntity: string
    orgUnit: string
}

const EVENT_QUERY = ({ ouMode, page, pageSize, program, order, programStage, filter, orgUnit }: EventQueryProps) => ({
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
    // const setTableDataState = useSetRecoilState(TableDataState);
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])

    async function getData() {
        setLoading(true)
        const eventsResults: EventQueryResults = await engine.query(EVENT_QUERY({
            ouMode: "SELECTED",
            page: 1,
            pageSize: 10,
            program: "wQaiD2V27Dp",
            order: "createdAt:desc",
            programStage: "Ni2qsy2WJn4",
            filter: "",
            orgUnit: "Shc3qNhrPAz"
        }))

        const teiResults: TeiQueryResults = await engine.query(TEI_QUERY({
            ouMode: "SELECTED",
            pageSize: 10,
            program: "wQaiD2V27Dp",
            orgUnit: "Shc3qNhrPAz",
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
