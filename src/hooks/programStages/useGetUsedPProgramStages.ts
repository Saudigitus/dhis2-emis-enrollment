import { simpleProgramStage } from "../../types/dataStore/DataStoreConfig";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

const useGetUsedPProgramStages = () => {
    const { performance, finalResult } = getDataStoreKeys();
    const performanceProgramStages = performance?.programStages.map((programStage: simpleProgramStage) => programStage.programStage);
    return [...performanceProgramStages, finalResult?.programStage]
}
export default useGetUsedPProgramStages
