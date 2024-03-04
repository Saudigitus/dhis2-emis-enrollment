import {getDataStoreKeys} from "../../utils/commons/dataStore/getDataStoreKeys";

/**
 * A hook to return enrollment program stages used in bulk enrollment template
 */
export const useGetEnrollmentStages = () => {
    const { registration, socioEconomics } = getDataStoreKeys();
    return [registration.programStage, socioEconomics.programStage]
}
