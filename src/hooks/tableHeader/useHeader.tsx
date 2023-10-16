import { useRecoilValue } from "recoil";
import { useState } from "react";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponse } from "../../utils/table/header/formatResponse";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";

export function useHeader() {
    const programConfigState = useRecoilValue(ProgramConfigState);
    const [columnHeader, setcolumnHeader] = useState()
    const { getDataStoreData } = getSelectedKey()

    return {
        columns: formatResponse(programConfigState, getDataStoreData),
        columnHeader,
        setcolumnHeader
    }
}
