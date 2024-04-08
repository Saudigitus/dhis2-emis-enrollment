import { useDataEngine } from "@dhis2/app-runtime";

const DELETE_EVENT_MUTATION: any = {
    resource: 'events',
    type: 'delete',
    id: ({ id }: any) => id,
}

export function useDeleteEvent() {
    const engine = useDataEngine();

    async function deleteEvent(event: string) {

        return await engine.mutate(DELETE_EVENT_MUTATION, { variables: { id: event } });
    }

    return { deleteEvent }
}