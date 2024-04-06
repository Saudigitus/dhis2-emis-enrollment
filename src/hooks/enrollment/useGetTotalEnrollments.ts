import { useDataEngine } from "@dhis2/app-runtime";

const ENROLLMENT_QUERY = (queryProps: any) => ({
    results: {
        resource: "tracker/enrollments",
        params: {
            fields: "enrollment",
            ...queryProps
        }
    }
})

export function useGetTotalEnrollments() {
    const engine = useDataEngine();

    async function getTotalEnrollment(program: string, orgUnit: string, trackedEntity: string) {

        return await engine.query(ENROLLMENT_QUERY({
            orgUnit: orgUnit,
            program: program,
            trackedEntity: trackedEntity
        }));
    }

    return { getTotalEnrollment }
}