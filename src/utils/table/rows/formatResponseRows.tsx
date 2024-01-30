import { type formatResponseRowsProps, type dataValuesProps,type attributesProps } from "../../../types/common/components";

type RowsProps = Record<string, string | number | boolean | any>;

export function formatResponseRows({ eventsInstances, teiInstances }: formatResponseRowsProps): RowsProps[] {
    const allRows: RowsProps[] = []
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

function dataValues(data: dataValuesProps[]): RowsProps {
    const localData: RowsProps = {}
    for (const dataElement of data) {
        localData[dataElement.dataElement] = dataElement.value
    }
    return localData
}

function attributes(data: attributesProps[]): RowsProps {
    const localData: RowsProps = {}
    for (const attribute of data) {
        localData[attribute.attribute] = attribute.value
    }
    return localData
}
