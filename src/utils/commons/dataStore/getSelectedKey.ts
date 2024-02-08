import { useRecoilValue } from "recoil";
import { useParams } from "../../../hooks/commons/useQueryParams"
import { DataStoreState } from "../../../schema/dataStoreSchema"
import { dataStoreRecord } from "../../../types/dataStore/DataStoreConfig";

export const getSelectedKey = () => {
    const { useQuery } = useParams()
    const emisConfig = useRecoilValue(DataStoreState);

    const getDataStoreData: dataStoreRecord = emisConfig?.length > 0 ? emisConfig?.find((dataStore: dataStoreRecord) => dataStore.key === useQuery().get("sectionType")) ?? {} as unknown as dataStoreRecord : {} as unknown as dataStoreRecord

    return { getDataStoreData }
}
