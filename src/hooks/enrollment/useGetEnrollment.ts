import { useDataEngine } from "@dhis2/app-runtime";

const ENROLLMENT_QUERY = {
    results: {
        resource: "tracker/enrollments",
        id:  ({ id } : any) => id,
        params: {
            fields: "*",
        }
    }
}

export function useGetEnrollment() {
    const engine = useDataEngine();

    async function getEnrollment(enrollment: string) {

        return await engine.query(ENROLLMENT_QUERY, { variables: { id: enrollment } });
    }

    return { getEnrollment }
}