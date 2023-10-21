import { type SelectedOptionsTypes, type HeadBarTypes } from "../../../types/headBar/HeadBarTypes"

function headBarData(selectedOptions: SelectedOptionsTypes, registration: any): HeadBarTypes[] {
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
            value: selectedOptions?.position ?? "Select a position",
            placeholder: "Search for position",
            dataElementId: registration?.position,
            component: "menuItemContainer"
        },
        {
            id: "7ce5c7f3",
            label: "Employment type",
            value: selectedOptions?.employmentType ?? "Select a employment type",
            placeholder: "Search for employment type",
            dataElementId: registration?.employmentType,
            component: "menuItemContainer"
        },
        {
            id: "j2e9b216",
            label: "Academic Year",
            value: selectedOptions?.academicYear ?? "Select academic year",
            placeholder: "Search for academic year",
            dataElementId: registration?.academicYear,
            component: "menuItemContainer"
        }
    ]
}
export { headBarData }
