import { simpleProgramStage } from "../../types/dataStore/DataStoreConfig";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

const useGetUsedPProgramStages = () => {
    const { performance, finalResult } = getDataStoreKeys();
    const performanceProgramStages = performance?.programStages.map((programStage: simpleProgramStage) => programStage.programStage) ?? [];
    const finalResultProgramStage = finalResult?.programStage ? [ finalResult?.programStage ] : [];
    
    return performance ? [...performanceProgramStages, ...finalResultProgramStage] : [ ...finalResultProgramStage ]
}
export default useGetUsedPProgramStages
