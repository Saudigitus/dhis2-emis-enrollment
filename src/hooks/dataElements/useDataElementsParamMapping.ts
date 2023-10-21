import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey"

const useDataElementsParamMapping = () => {
    const { getDataStoreData } = getSelectedKey()
    return {
        [getDataStoreData.registration?.employmentType]: "employmentType",
        [getDataStoreData.registration?.academicYear]: "academicYear",
        [getDataStoreData.registration?.position]: "position"
    }
}
export default useDataElementsParamMapping;
