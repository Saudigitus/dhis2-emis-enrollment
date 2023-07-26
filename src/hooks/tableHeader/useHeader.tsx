import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponse } from "../../utils/table/header/formatResponse";
import { type ProgramConfig } from "../../types/programConfig/ProgramConfig";

export function useHeader() {
    const programConfigState = useRecoilValue(ProgramConfigState) as ProgramConfig;
    const [columnHeader, setcolumnHeader] = useState()

    return {
        columns: formatResponse(programConfigState),
        columnHeader,
        setcolumnHeader
    }
}
