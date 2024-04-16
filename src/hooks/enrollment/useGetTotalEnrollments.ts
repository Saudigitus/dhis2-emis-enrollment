import { useDataEngine } from "@dhis2/app-runtime";

const ENROLLMENT_QUERY = {
    results: {
        resource: "tracker/trackedEntities",
        id: ({ id }: any) => id,
        params: {
            fields: "enrollments[enrollment]",
        }
    }
}

export function useGetTotalEnrollments() {
    const engine = useDataEngine();

    async function getTotalEnrollment(trackedEntity: string) {

        return await engine.query(ENROLLMENT_QUERY, { variables: { id: trackedEntity } });
    }

    return { getTotalEnrollment }
}