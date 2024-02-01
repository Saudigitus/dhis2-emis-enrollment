import { getSelectedKey } from "./getSelectedKey";

const { attendance, key, performance, program, registration, 'socio-economics': socioEconomics, transfer, lastUpdate } = getSelectedKey().getDataStoreData;

export const getDataStoreKeys = {
    getAttendance: () => attendance,
    getDataStoreKey: () => key,
    getPerformace: () => performance,
    getProgramId: () => program,
    getRegistration: () => registration,
    getSocioEconomics: () => socioEconomics,
    getTransfer: () => transfer,
    getDataStoreLastUpdate: () => lastUpdate
};