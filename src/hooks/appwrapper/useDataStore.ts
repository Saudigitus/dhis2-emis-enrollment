import { useEffect } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import { useSetRecoilState } from 'recoil';
import { DataStoreState } from '../../schema/dataStoreSchema';

const DATASTORE_QUERY = ({
    config: {
        resource: "dataStore/emis-apps-configuration/config",
        params: {
            fields: "*"
        }
    }
})

export function useDataStore() {
    const { data, loading, error } = useDataQuery<{ config: any }>(DATASTORE_QUERY)
    const setDataStoreState = useSetRecoilState(DataStoreState);

    useEffect(() => {
        setDataStoreState(data?.config)
    }, [data])

    return {
        data,
        loading,
        error
    }
}
