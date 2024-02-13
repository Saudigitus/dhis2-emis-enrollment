import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

const useDataElementsParamMapping = () => {
    const { registration } = getDataStoreKeys()
    return {
        [registration?.section]: "class",
        [registration?.academicYear]: "academicYear",
        [registration?.grade]: "grade"
    }
}
export default useDataElementsParamMapping;
