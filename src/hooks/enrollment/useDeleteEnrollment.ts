import { useDataEngine } from "@dhis2/app-runtime";

const ENROLLMENT_MUTATION: any = {
    resource: "enrollments",
    type: 'delete',
    id: ({ id }: any) => id,
}

export function useDeleteEnrollment() {
    const engine = useDataEngine();

    async function deleteEnrollment(enrollment: string) {

        return await engine.mutate(ENROLLMENT_MUTATION, { variables: { id: enrollment } });
    }

    return { deleteEnrollment }
}