import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponse } from "../../utils/table/header/formatResponse";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import { TableColumnState } from "../../schema/columnSchema";

export function useHeader() {
    const tableColumns = useRecoilValue(TableColumnState)
    const programConfigState = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()

    return {
        columns: formatResponse(programConfigState, getDataStoreData, tableColumns),
    }
}
