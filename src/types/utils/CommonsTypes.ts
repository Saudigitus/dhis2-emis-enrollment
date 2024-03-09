import { dataStoreRecord } from "../dataStore/DataStoreConfig"
import { SelectionSchemaConfig } from "../../schema/tableSelectedRowsSchema"

interface CheckIsRowSelectedProps {
    rawRowData: any
    selected: SelectionSchemaConfig
}

interface ReplaceSelectedRowProps {
    rawRowData: any
}

interface FormatDistinctValuesProps {
     array: any[]
}

interface GetTypesOfButtonProps {
     type: string
}
 
interface FormatToStringProps {
     value: any
}

export type { CheckIsRowSelectedProps, ReplaceSelectedRowProps, FormatDistinctValuesProps, GetTypesOfButtonProps, FormatToStringProps }