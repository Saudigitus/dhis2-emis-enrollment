import { useDataEngine } from "@dhis2/app-runtime";
import { TeiSearchQueryProps } from "../../types/api/WithRegistrationProps";

  const SEARCH_TEI_QUERY = ({program, filter, ouMode = "ACCESSIBLE", page, pageSize }: TeiSearchQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,createdAt]",
            ouMode,
            totalPages: true,
            program,
            filter,
            page,
            pageSize
        }
    }
})

export function useSearchTei() {
    const engine = useDataEngine();

    async function getTeiSearch(program: string, filters: string) {
        return await engine.query(SEARCH_TEI_QUERY({
            pageSize: 5,
            page: 1,
            program,
            filter: filters.slice(0, -1)
            }),
        );
          
    }

    return { getTeiSearch }
}