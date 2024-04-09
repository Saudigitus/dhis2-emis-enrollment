import { useDataEngine } from "@dhis2/app-runtime";
import { TeiQueryProps, TeiQueryResults } from "../../types/api/WithRegistrationProps";


const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value]",
            ...queryProps
        }
    }
})

export function useGetTei() {
    const engine = useDataEngine();

    async function getTei(program: string, orgUnit: string, trackedEntity: string) {
        return await engine.query(TEI_QUERY({
            pageSize:10,
            program: program,
            orgUnit: orgUnit,
            trackedEntity: trackedEntity
        })) as unknown as TeiQueryResults

    }

    return { getTei }
}