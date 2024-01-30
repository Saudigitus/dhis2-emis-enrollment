import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";

const useGetUsedPProgramStages = () => {
    const { getDataStoreData } = getSelectedKey();
    const performanceProgramStages = getDataStoreData?.performance?.programStages.map((programStage: any) => programStage.programStage);
    return [...performanceProgramStages, getDataStoreData?.["final-result"]?.programStage]
}
export default useGetUsedPProgramStages
