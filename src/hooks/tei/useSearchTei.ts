import { useDataEngine } from "@dhis2/app-runtime";
import { TeiSearchQueryProps } from "../../types/api/WithRegistrationProps";

  const SEARCH_TEI_QUERY = ({program, orgUnit, filter, ouMode = "ACCESSIBLE" }: TeiSearchQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value]",
            ouMode,
            totalPages: true,
            program,
            orgUnit,
            filter
        }
    }
})

export function useSearchTei() {
    const engine = useDataEngine();

    async function getTeiSearch(program: string, orgUnit: string, filters: string) {
        return await engine.query(SEARCH_TEI_QUERY({
            program,
            filter: filters.slice(0, -1),
            orgUnit
            }),
        );
          
    }

    return { getTeiSearch }
}