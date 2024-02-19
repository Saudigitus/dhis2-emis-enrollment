import { headBarDataElements } from "./headBarDataElements"
import { type dataStoreRecord } from "../../../types/dataStore/DataStoreConfig"
import { type SelectedOptionsTypes, type HeadBarTypes } from "../../../types/headBar/HeadBarTypes"
import { programStageDataElements } from "../../../types/programStageConfig/ProgramStageConfig"

function headBarData(selectedOptions: SelectedOptionsTypes, getDataStoreData: dataStoreRecord, programStageDataElements: programStageDataElements[]): HeadBarTypes[] {
    return [
        {
            id: "c540ac7c",
            label: "School",
            value: selectedOptions?.schoolName ?? "Select a school",
            placeholder: "Search for organisation unit",
            component: "orgUnitTree",
            selected: Boolean(selectedOptions?.schoolName),
        },
        ...headBarDataElements(selectedOptions, getDataStoreData, programStageDataElements),
        {
            id: "j2e9b216",
            label: "Academic Year",
            value: selectedOptions?.academicYear ?? "Select academic year",
            placeholder: "Search for academic year",
            dataElementId: getDataStoreData?.registration?.academicYear,
            component: "menuItemContainer",
            selected: Boolean(selectedOptions?.academicYear),
        }
    ]
}
export { headBarData }
