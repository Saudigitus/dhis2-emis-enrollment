import { useEffect } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import { useSetRecoilState } from 'recoil';
import { DataStoreState } from '../../schema/dataStoreSchema';
import useShowAlerts from '../commons/useShowAlert';

const DATASTORE_QUERY = ({
    config: {
        resource: "dataStore/semis/values",
        params: {
            fields: "*"
        }
    }
})

export function useDataStore() {
    const setDataStoreState = useSetRecoilState(DataStoreState);
    const { hide, show } = useShowAlerts()
    const { data, loading, error } = useDataQuery<{ config: any }>(DATASTORE_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    useEffect(() => {
        setDataStoreState(data?.config[0])
    }, [data])

    return {
        data,
        loading,
        error
    }
}
