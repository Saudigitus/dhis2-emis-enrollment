import { useDataEngine } from "@dhis2/app-runtime";

const DELETE_TEI_MUTATION: any = {
    resource: 'trackedEntityInstances',
    type: 'delete',
    id: ({ id }: any) => id,
}

export function useDeleteTEI() {

    const engine = useDataEngine();

    async function deleteTEI(trackedEntity: string) {

        return await engine.mutate(DELETE_TEI_MUTATION, { variables: { id: trackedEntity } })
            .catch((error) => console.log(error));
    }

    return { deleteTEI }
}