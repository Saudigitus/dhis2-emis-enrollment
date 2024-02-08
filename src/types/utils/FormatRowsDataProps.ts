import { attributesProps } from "../api/WithRegistrationProps"
import { dataValuesProps } from "../api/WithoutRegistrationProps"
import { OptionsProps } from "../variables/AttributeColumns"

interface FormatResponseRowsProps {
    eventsInstances: {
        trackedEntity: string
        dataValues: dataValuesProps[]
    }[]
    teiInstances: {
        trackedEntity: string
        attributes: attributesProps[]
        enrollments: {
            enrollment: string
            orgUnit: string
            program: string
        }[]
    }[]
}

type RowsDataProps = Record<string, string | number | boolean | any>;

interface defaultProps {
    attribute: string
    value: string
    headers: Array<{
        id: string
        optionSets?: {
            id: string
            options: OptionsProps[]
        }[]
    }>
}
export type { FormatResponseRowsProps, RowsDataProps, defaultProps }
