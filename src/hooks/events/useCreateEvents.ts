import { useDataMutation } from "@dhis2/app-runtime";

const POST_EVENT: any = {
    resource: 'tracker',
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        importStrategy: 'CREATE_AND_UPDATE',
        async: false
    }
}

export function usePostEvent() {

    const [create, { loading, data, error }] = useDataMutation(POST_EVENT, {});

    return {
        loadUpdateEvent: loading,
        updateEvent: create,
        data
    }
}
