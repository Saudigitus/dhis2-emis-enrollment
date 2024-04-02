import { useSetRecoilState } from "recoil"
import { HeaderFieldsState } from "../../schema/headersSchema"
import { useLocation } from "react-router-dom";
import useDataElementsParamMapping from "../dataElements/useDataElementsParamMapping";
import { useParams } from "../commons/useQueryParams";

export function useGetInitialValues() {
    const location = useLocation()
    const paramsMapping = useDataElementsParamMapping();
    const setHeaderFields = useSetRecoilState(HeaderFieldsState)
    const entries = location?.search?.split('?')?.[1]?.split('&')?.map((item) => item.split('=')).filter(x => x.length === 2)
    const dataElementsQuerybuilder = []
    const { urlParamiters } = useParams()

    if (entries?.length > 0) {
        for (const [key, value] of entries) {
            const keys = Object.entries(paramsMapping)
            for (const [dataElement, name] of keys) {
                if (name === key && dataElement !== null && dataElement !== undefined) {
                    dataElementsQuerybuilder.push(`${dataElement}:in:${value.replace("+", " ")}`)
                }
            }
        }

        let copyValues = dataElementsQuerybuilder.filter(x => {
            if (x.split(":in:")[1].replace(/\s/g, '').length > 0) {
                return x
            }
        })

        setHeaderFields({
            attributes: [],
            dataElements: copyValues
        })
    }

    return {
        isSetSectionType: location?.search.includes("sectionType"),
        sectionType: urlParamiters().sectionType
    }
}
