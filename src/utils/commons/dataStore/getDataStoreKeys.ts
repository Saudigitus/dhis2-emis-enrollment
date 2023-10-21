import { getSelectedKey } from "./getSelectedKey";

export const getDataStoreKeys = {
    getAttendance: () => getSelectedKey().getDataStoreData.attendance,
    getDataStoreKey: () => getSelectedKey().getDataStoreData.key,
    getPerformace: () => getSelectedKey().getDataStoreData.performance,
    getProgramId: () => getSelectedKey().getDataStoreData.program,
    getRegistration: () => getSelectedKey().getDataStoreData.registration,
    getSocioEconomics: () => getSelectedKey().getDataStoreData['socio-economics'],
    getTransfer: () => getSelectedKey().getDataStoreData.transfer,
    getDataStoreLastUpdate: () => getSelectedKey().getDataStoreData.lastUpdate
}
