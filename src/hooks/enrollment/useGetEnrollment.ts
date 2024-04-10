import { useDataEngine } from "@dhis2/app-runtime";

const ENROLLMENT_QUERY = {
    results: {
        resource: "tracker/enrollments",
        id:  ({ id } : any) => id,
        params: ({ params } : any) => params,
    }
}

export function useGetEnrollment() {
    const engine = useDataEngine();

    async function getEnrollment(enrollment: string, params : any) {

        return await engine.query(ENROLLMENT_QUERY, { variables: { id: enrollment, params : params } });
    }

    return { getEnrollment }
}