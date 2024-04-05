import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponseTEI } from "../../utils/tei/formatResponseAttributes";

function useGetProgramsAttributes() {
    const programConfigState = useRecoilValue(ProgramConfigState);
    
    return {
        teiAttributes: formatResponseTEI(programConfigState),
    }
}
export { useGetProgramsAttributes }
