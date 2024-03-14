import { useDataEngine } from "@dhis2/app-runtime";
import useShowAlerts from '../commons/useShowAlert';

const ENROLLMENT_QUERY : any = {
    results: {
        resource: "tracker/enrollments",
        id: ({ id }: { id: string }) => id,
        params: {
            fields: "*",
        }
    }
}

export function useGetEnrollment() {
    const engine = useDataEngine();
    const { hide, show } = useShowAlerts()

    async function getEnrollment(enrollment: string) {
            return await engine.query(ENROLLMENT_QUERY, {
                variables: { id: enrollment },   
            })
            .catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            });
    }

    return { getEnrollment }
}