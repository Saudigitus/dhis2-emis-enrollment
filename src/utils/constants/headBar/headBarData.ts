import { type HeadBarTypes } from "../../../types/headBar/HeadBarTypes"

function headBarData(): HeadBarTypes[] {
    return [
        {
            id: "c540ac7c",
            label: "School",
            value: "Primary School ABCD",
            placeholder: "Search for organisation unit",
            component: "orgUnitTree"
        },
        {
            id: "981ed8a3",
            label: "Grade",
            value: "Grade 1",
            placeholder: "Search for grade",
            optionSetId: "xbVWkOuF6CW",
            component: "menuItemContainer"
        },
        {
            id: "7ce5c7f3",
            label: "Class",
            value: "All",
            placeholder: "Search for class",
            optionSetId: "hq8YJB1Kd4K",
            component: "menuItemContainer"
        },
        {
            id: "j2e9b216",
            label: "Academic Year",
            value: "2023",
            placeholder: "Search for academic year",
            optionSetId: "Mb3GXOfAze2",
            component: "menuItemContainer"
        }
    ]
}
export { headBarData }
