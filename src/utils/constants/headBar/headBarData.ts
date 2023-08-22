import { type SelectedOptionsTypes, type HeadBarTypes } from "../../../types/headBar/HeadBarTypes"

function headBarData(selectedOptions: SelectedOptionsTypes): HeadBarTypes[] {
    return [
        {
            id: "c540ac7c",
            label: "School",
            value: selectedOptions?.schoolName ?? "Select a school",
            placeholder: "Search for organisation unit",
            component: "orgUnitTree"
        },
        {
            id: "981ed8a3",
            label: "Position",
            value: selectedOptions?.grade ?? "Select a position",
            placeholder: "Search for a position",
            dataElementId: "EuzOMK1tTNv",
            component: "menuItemContainer"
        },
        {
            id: "7ce5c7f3",
            label: "Employment type",
            value: selectedOptions?.class ?? "Select an employment type",
            placeholder: "Search for an employment type",
            dataElementId: "gXBJIHjcwiH",
            component: "menuItemContainer"
        },
        {
            id: "j2e9b216",
            label: "Academic Year",
            value: selectedOptions?.academicYear ?? "Select academic year",
            placeholder: "Search for academic year",
            dataElementId: "iDSrFrrVgmX",
            component: "menuItemContainer"
        }
    ]
}
export { headBarData }
