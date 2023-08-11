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
                    disabled: false,
                    appName: "SEMIS-Enrollment",
                    route: "/enrollment"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
                },
                {
                    icon: fileDocument,
                    label: "Performance",
                    showBadge: false,
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
                },
                {
                    icon: gauge,
                    label: "Final result",
                    showBadge: false,
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: false,
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
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
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
                },
                {
                    icon: userGroup,
                    label: "Non-teacher registry",
                    showBadge: false,
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: false,
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
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
                    disabled: true,
                    appName: "DHIS2-App-Name",
                    route: "#"
                }
            ]
        }
    ]
}
export {sideBarData}
