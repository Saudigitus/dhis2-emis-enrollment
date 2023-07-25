import { type HeadBarTypes } from "../../../types/headBar/HeadBarTypes"

function headBarData(): HeadBarTypes[] {
    return [
        {
            label: "School",
            value: "Primary School ABCD",
            placeholder: "Search for organisation unit",
            component: "orgUnitTree"
        },
        {
            label: "Grade",
            value: "Grade 1",
            placeholder: "Search for grade",
            optionSetId: "xbVWkOuF6CW",
            component: "menuItemContainer"
        },
        {
            label: "Class",
            value: "All",
            placeholder: "Search for class",
            optionSetId: "hq8YJB1Kd4K",
            component: "menuItemContainer"
        }
    ]
}
export { headBarData }
