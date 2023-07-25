
import { useSetRecoilState } from "recoil";
import { TableDataState } from "../../schema/tableData";
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";

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
}

const EVENT_QUERY = ({ ouMode, page, pageSize, program, order, programStage, filter, orgUnit }: EventQueryProps) => ({
    reults: {
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

const TEI_QUERY = ({ ouMode, pageSize, program, trackedEntity }: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            program,
            ouMode,
            pageSize,
            trackedEntity,
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,status,orgUnit,enrolledAt]"
        }
    }
})

export function useTableData() {
    const engine = useDataEngine();
    const setTableDataState = useSetRecoilState(TableDataState);
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])

    // const teiQueryResults = useDataQuery(TEI_QUERY({
    //     ouMode: "ACCESSIBLE",
    //     pageSize: 10,
    //     program: "",
    //     trackedEntity: ""
    // }));

    async function getData() {
        const eventsResults = await engine.query(EVENT_QUERY({
            ouMode: "SELECTED",
            page: 1,
            pageSize: 10,
            program: "wQaiD2V27Dp",
            order: "createdAt:desc",
            programStage: "Ni2qsy2WJn4",
            filter: "",
            orgUnit: "Shc3qNhrPAz"
        }))

        console.log(eventsResults);

        setLoading(true)
    }

    return {
        getData,
        tableData,
        loading
    }
}
