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
            placeholder: "Search for program"
        },
        {
            label: "Class",
            value: "All",
            placeholder: "Search for program stage"
        }
    ]
}
export {headBarData}
