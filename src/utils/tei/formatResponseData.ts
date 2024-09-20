function formatDataElementsEvents(data: any) {
    const column = []
    for (const dataValues of data || []) {
        const columnObj: any = {}
        columnObj["id"] = dataValues.event
        columnObj["trackedEntity"] = dataValues.trackedEntity
        columnObj["active"] = dataValues.active
        columnObj["enrollment"] = dataValues.enrollment
        columnObj["orgUnitName"] = dataValues.orgUnitName
        columnObj["orgUnitId"] = dataValues.orgUnit
        for (const dataElement of dataValues.dataValues || []) {
            columnObj[dataElement?.dataElement] = dataElement?.value
        }
        column.push(columnObj)
    }
    return column
}

function formatAttributesTracked(data: any) {
    const column: any = []

    for (const trackedEntityInstance of data) {
        const columnObj: any = {}
        columnObj["id"] = trackedEntityInstance.trackedEntity
        columnObj["orgUnit"] = trackedEntityInstance.enrollments[0].orgUnit
        columnObj["enrollment"] = trackedEntityInstance.enrollments[0].enrollment
        columnObj["orgUnitName"] = trackedEntityInstance.enrollments[0].orgUnitName
        columnObj["program"] = trackedEntityInstance.enrollments[0].program
        columnObj["trackedEntityType"] = trackedEntityInstance.trackedEntityType

        for (const attribute of trackedEntityInstance?.attributes || []) {
            columnObj[attribute?.attribute] = attribute?.value
        }

        column.push(columnObj)
    }

    return column
}

export const formatResponseData = (type: string, data: any) => {
    if (data) {
        if (type === "WITH_REGISTRATION") {
            return formatAttributesTracked(data)
        } else if (type === "WITHOUT_REGISTRATION") {
            return formatDataElementsEvents(data)
        }
    }
}