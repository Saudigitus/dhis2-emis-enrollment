import gauge from "../../../assets/images/sidebar/gauge.svg"
import fileDocument from "../../../assets/images/sidebar/file-document.svg"
import glyph from "../../../assets/images/sidebar/Glyph.svg"
import listAdd from "../../../assets/images/sidebar/listAdd.svg"
import logOut from "../../../assets/images/sidebar/log-out.svg"
import userGroup from "../../../assets/images/sidebar/user-group.svg"
import { type SideBarItemProps } from "../../../types/sideBar/SideBarTypes"

function sideBarData (): SideBarItemProps[] {
    return [
        {
            title: "Students",
            subItems: [
                {
                    icon: listAdd,
                    label: "Enrollment",
                    showBadge: false,
                    route: "/home"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    route: "/home1"
                },
                {
                    icon: fileDocument,
                    label: "Performance",
                    showBadge: false,
                    route: "/home2"
                },
                {
                    icon: gauge,
                    label: "Final result",
                    showBadge: false,
                    route: "/home3"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: true,
                    route: "/home4"
                }
            ]
        },
        {
            title: "Staff",
            subItems: [
                {
                    icon: userGroup,
                    label: "Teacher registry",
                    showBadge: false,
                    route: "/home5"
                },
                {
                    icon: userGroup,
                    label: "Non-teacher registry",
                    showBadge: false,
                    route: "/home6"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    route: "/home7"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: false,
                    route: "/home8"
                }
            ]
        },
        {
            title: "Academic Year",
            subItems: [
                {
                    icon: listAdd,
                    label: "School Calendar",
                    showBadge: false,
                    route: "/home9"
                }
            ]
        }
    ]
}
export {sideBarData}
