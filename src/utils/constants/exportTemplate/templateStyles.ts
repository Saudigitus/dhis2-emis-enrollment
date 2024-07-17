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
    top: { style: 'thin', color: { argb: '9B9B9B' }, },
    left: { style: 'thin', color: { argb: '9B9B9B' } },
    bottom: { style: 'thin', color: { argb: '9B9B9B' } },
    right: { style: 'thin', color: { argb: '9B9B9B' } },
}

export { cellBorders,  cellFillBg}