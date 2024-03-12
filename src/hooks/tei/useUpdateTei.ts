import { useDataMutation } from "@dhis2/app-runtime"

const UPDATE_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        importStrategy: 'UPDATE',
        async: false
    }
}

export default function useUpdateTei() {
    const [create, { loading, data }] = useDataMutation(UPDATE_TEI, {});

    return {
        loading,
        updateTei: create,
        data
    }
}
