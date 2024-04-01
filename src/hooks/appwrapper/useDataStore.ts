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
                message: `${("Could not load the app")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(data) {
            setDataStoreState(data?.config)
        }
    })

    return {
        data,
        loading,
        error
    }
}
