import { attributesProps } from "../api/WithRegistrationProps"
import { dataValuesProps } from "../api/WithoutRegistrationProps"
import { ProgramConfig } from "../programConfig/ProgramConfig"

interface FormatResponseRowsProps {
    eventsInstances: {
        trackedEntity: string
        dataValues: dataValuesProps[]
        enrollment: string
        event?: string
        occurredAt?: string
        isRegistrationEvent?: boolean
    }[]
    teiInstances: {
        trackedEntity: string
        attributes: attributesProps[]
        enrollments: {
            enrollment: string
            orgUnit: string
            program: string
            status: string
        }[]
        createdAt: string
        programOwners: {
            orgUnit: string
        }[]
    }[]
    socioEconInstances?: {
        trackedEntity: string
        dataValues: dataValuesProps[]
        enrollment: string
        event?: string
        occurredAt?: string
        isRegistrationEvent?: boolean
    }[]
}

type RowsDataProps = Record<string, string | number | boolean | any>;

interface defaultProps {
    metaData: string
    program: ProgramConfig
    value: string
}
export type { FormatResponseRowsProps, RowsDataProps, defaultProps }
