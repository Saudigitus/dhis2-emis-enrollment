import { useDataQuery } from "@dhis2/app-runtime"
import { useSetRecoilState } from 'recoil';
import useShowAlerts from '../commons/useShowAlert';
import { DataStoreBulkOperationsState } from "../../schema/dataStoreBulkOperationsSchema";

const DATASTORE_QUERY = ({
    config: {
        resource: "dataStore/semis/bulkOperations",
        params: {
            fields: "*"
        }
    }
})

export function useDataStoreBulkOperations() {
    const setDataStoreBulkOperationsState = useSetRecoilState(DataStoreBulkOperationsState);
    const { hide, show } = useShowAlerts()
    const { data, loading, error } = useDataQuery<{ config: any }>(DATASTORE_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(data) {
            setDataStoreBulkOperationsState(data?.config)
        }
    })

    return {
        data,
        loading,
        error
    }
}
