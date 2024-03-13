import { attributesProps } from "../../../types/api/WithRegistrationProps";
import { dataValuesProps } from "../../../types/api/WithoutRegistrationProps";
import { FormatResponseRowsProps, RowsDataProps } from "../../../types/utils/FormatRowsDataProps";

export function formatResponseRows({ eventsInstances, teiInstances }: FormatResponseRowsProps): RowsDataProps[] {
    const allRows: RowsDataProps[] = []
    for (const event of eventsInstances || []) {
        const teiDetails = teiInstances.find(tei => tei.trackedEntity === event.trackedEntity)
        allRows.push({
            ...dataValues(event.dataValues),
            ...(attributes((teiDetails?.attributes) ?? [])),
            trackedEntity: event.trackedEntity,
            enrollmentId: teiDetails?.enrollments?.[0]?.enrollment,
            orgUnitId: teiDetails?.enrollments?.[0]?.orgUnit,
            programId: teiDetails?.enrollments?.[0]?.program
        })
    }
    return allRows;
}

export function dataValues(data: dataValuesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    for (const dataElement of data) {
        localData[dataElement.dataElement] = dataElement.value
    }
    return localData
}

export function attributes(data: attributesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    for (const attribute of data) {
        localData[attribute.attribute] = attribute.value
    }
    return localData
}
