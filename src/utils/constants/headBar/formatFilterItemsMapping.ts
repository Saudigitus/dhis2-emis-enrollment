import { filterItem } from "../../../types/dataStore/DataStoreConfig";

const formatFilterItems = (filters: filterItem[]) => {
    const formattedObject: Record<string, string> = {}
    filters?.forEach(item => { formattedObject[item.dataElement] = item.code});
    return formattedObject;
}

export { formatFilterItems }