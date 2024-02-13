import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey"

const useDataElementsParamMapping = () => {
    const { getDataStoreData } = getSelectedKey()
    return {
        [getDataStoreData.registration?.section]: "class",
        [getDataStoreData.registration?.academicYear]: "academicYear",
        [getDataStoreData.registration?.grade]: "grade"
    }
}
export default useDataElementsParamMapping;
