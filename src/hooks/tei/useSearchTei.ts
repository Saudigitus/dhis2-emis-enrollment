import { useDataEngine } from "@dhis2/app-runtime";
import { TeiSearchQueryProps } from "../../types/api/WithRegistrationProps";

  const SEARCH_TEI_QUERY = ({program, filter, ouMode = "ACCESSIBLE" }: TeiSearchQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,createdAt]",
            ouMode,
            totalPages: true,
            program,
            filter
        }
    }
})

export function useSearchTei() {
    const engine = useDataEngine();

    async function getTeiSearch(program: string, filters: string) {
        return await engine.query(SEARCH_TEI_QUERY({
            program,
            filter: filters.slice(0, -1)
            }),
        );
          
    }

    return { getTeiSearch }
}