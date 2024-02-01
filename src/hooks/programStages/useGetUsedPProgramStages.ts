import { SimpleProgramStage } from "../../types/common/components";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";

const useGetUsedPProgramStages = () => {
    const { getDataStoreData } = getSelectedKey();
    const performanceProgramStages = getDataStoreData?.performance?.programStages.map((programStage: SimpleProgramStage) => programStage.programStage);
    return [...performanceProgramStages, getDataStoreData?.["final-result"]?.programStage]
}
export default useGetUsedPProgramStages
