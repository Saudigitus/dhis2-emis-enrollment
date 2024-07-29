import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponse } from "../../utils/table/header/formatResponse";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import { TableColumnState } from "../../schema/columnSchema";
import useViewportWidth from "../rwd/useViewportWidth";

export function useHeader() {
    const tableColumns = useRecoilValue(TableColumnState)
    const programConfigState = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()
    const { viewPortWidth } = useViewportWidth()

    return {
        columns: formatResponse(programConfigState, getDataStoreData, tableColumns, viewPortWidth),
    }
}
