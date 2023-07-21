import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponse } from "../../utils/table/header/formatResponse";
import { type ProgramConfig } from "../../types/programConfig/ProgramConfig";

export function useHeader() {
    const programConfigState = useRecoilValue(ProgramConfigState) as ProgramConfig;

    return {
        columns: formatResponse(programConfigState)
    }
}
