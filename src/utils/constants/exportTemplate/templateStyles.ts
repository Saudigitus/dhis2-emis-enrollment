import { getHeaderBgColor } from "../../../hooks/exportTemplate/getHeaderBgColor"
import { VariablesTypes } from "../../../types/variables/AttributeColumns"

const cellFillBg = (metadataType: VariablesTypes) =>  {
    return { 
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: getHeaderBgColor(metadataType) },
    }
}

const cellBorders = {
    top: { style: 'thin', color: { argb: 'D4D4D4' } },
    left: { style: 'thin', color: { argb: 'D4D4D4' } },
    bottom: { style: 'thin', color: { argb: 'D4D4D4' } },
    right: { style: 'thin', color: { argb: 'D4D4D4' } },
}

export { cellBorders,  cellFillBg}