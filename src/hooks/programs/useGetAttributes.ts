import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes'
import { useRecoilValue } from 'recoil'
import { ProgramConfigState } from '../../schema/programSchema';

function useGetAttributes() {
    const programConfiVariables = useRecoilValue(ProgramConfigState)

    return {
        attributes: formatResponseTEI(programConfiVariables)
    }
}
export { useGetAttributes }
