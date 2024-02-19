import { getSelectedKey } from "./getSelectedKey";


export const getDataStoreKeys =() => {
    const { attendance, key, performance, program, registration, "final-result": finalResult, 'socio-economics': socioEconomics, transfer, trackedEntityType, lastUpdate, defaults, filters } = getSelectedKey().getDataStoreData;
    
    return {
        attendance,
        dataStoreKey: key,
        performance,
        program,
        registration,
        finalResult,
        socioEconomics,
        transfer,
        trackedEntityType,
        lastUpdate,
        currentAcademicYear: defaults?.currentAcademicYear,
        filterItems: filters?.dataElements
    }
};