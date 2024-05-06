import { Attribute } from "../../../types/generated/models"
import { getDisplayName } from "../../table/rows/getDisplayNameByOption"
import { attributes, dataValues } from "../../table/rows/formatResponseRows"
import { CustomAttributeProps } from "../../../types/variables/AttributeColumns"


export const formatFormSection = (dataElements: any[]) => {
    return dataElements?.map((dataElement: any) => {
        return {
            visible:  dataElement?.visible,
            disabled: true,
            id: dataElement?.id,
            key: dataElement.id,
            name: dataElement?.id,
            labelName: dataElement?.displayName,
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        }
    })?.filter((value: any) => value)
}

export const getinitialValuesDisplayName = (eventdataValues: any, teiattributes: any, program: any) => {
    const values = { ...dataValues(eventdataValues), ...attributes(teiattributes) }
    for (const [key, value] of Object.entries(values)) {
        values[key] = getDisplayName({ metaData: key, value, program })
    }
    return values
}