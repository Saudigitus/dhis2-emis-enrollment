import { useDataEngine } from "@dhis2/app-runtime";

const UPDATE_ENROLLMENT_DATE: any = {
    resource: `enrollments`,
    type: 'update',
    data: ({ data }: any) => data,
    id: ({ id }: any) => id,
    params: {
        importStrategy: 'UPDATE',
        async: false
    }
}

export function useUpdateEnrollment() {
    const engine = useDataEngine();

    async function updateEnrollment(enrollment: string, data: any) {

        return await engine.mutate(UPDATE_ENROLLMENT_DATE, { variables: { id: enrollment, data: data } });
    }

    return { updateEnrollment }
}