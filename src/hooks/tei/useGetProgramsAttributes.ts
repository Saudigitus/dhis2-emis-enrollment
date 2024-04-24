import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponseTEI } from "../../utils/tei/formatResponseAttributes";
import { CustomAttributeProps } from "../../types/variables/AttributeColumns";

function useGetProgramsAttributes() {
    const programConfigState = useRecoilValue(ProgramConfigState);

    const getAttributesToDisplay = (attributes: CustomAttributeProps[]) => {
        const uniqueAttributes = attributes.filter(attr => attr?.unique === true);
        const searchableAttributes = attributes.filter(attr => attr?.searchable === true);
    
        return [...uniqueAttributes.slice(0, 1), ...searchableAttributes.slice(0, 2)];
    }
    
    return {
        teiAttributes: formatResponseTEI(programConfigState),
        attributesToDisplay: getAttributesToDisplay(formatResponseTEI(programConfigState))
    }
}
export { useGetProgramsAttributes }
