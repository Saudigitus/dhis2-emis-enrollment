import { attributesProps } from "../api/WithRegistrationProps"
import { dataValuesProps } from "../api/WithoutRegistrationProps"
import { CustomAttributeProps } from "../variables/AttributeColumns"

interface FormatResponseRowsProps {
    eventsInstances: {
        trackedEntity: string
        dataValues: dataValuesProps[]
        enrollment: string
    }[]
    teiInstances: {
        trackedEntity: string
        attributes: attributesProps[]
        enrollments: {
            enrollment: string
            orgUnit: string
            program: string
        }[]
        createdAt: string
    }[]
}

type RowsDataProps = Record<string, string | number | boolean | any>;

interface defaultProps {
    attribute: string
    value: string
    headers: CustomAttributeProps[]
}
export type { FormatResponseRowsProps, RowsDataProps, defaultProps }
