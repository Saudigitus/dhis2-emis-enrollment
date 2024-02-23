import gauge from "../../../assets/images/sidebar/gauge.svg"
import fileDocument from "../../../assets/images/sidebar/file-document.svg"
import glyph from "../../../assets/images/sidebar/Glyph.svg"
import listAdd from "../../../assets/images/sidebar/listAdd.svg"
import logOut from "../../../assets/images/sidebar/log-out.svg"
import userGroup from "../../../assets/images/sidebar/user-group.svg"
import { type SideBarItemProps } from "../../../types/sideBar/SideBarTypes"
import { subItemRoute } from "./subItemRoute"
import { filterItem } from "../../../types/dataStore/DataStoreConfig"

function sideBarData(locationParms : string, filterDataElements: filterItem[]): SideBarItemProps[] {

    return [
        {
            title: "student",
            subItems: [
                {
                    icon: listAdd,
                    label: "Enrollment",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Enrollment",
                    route: `enrollment?${subItemRoute(locationParms.slice(1), 'student', filterDataElements)}`, 
                    pathName: "/enrollment"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Attendance",
                    route: `attendance?${subItemRoute(locationParms.slice(1), 'student', filterDataElements)}`, 
                    pathName: "/attendance"
                },
                {
                    icon: fileDocument,
                    label: "Performance",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Performance",
                    route: `performance?${subItemRoute(locationParms.slice(1), 'student', filterDataElements)}`, 
                    pathName: "/performance"
                },
                {
                    icon: gauge,
                    label: "Final result",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Final-Result",
                    route: `final-result?${subItemRoute(locationParms.slice(1), 'student', filterDataElements)}`, 
                    pathName: "/final-result"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Student-Transfer",
                    route: `student-transfer?${subItemRoute(locationParms.slice(1), 'student', filterDataElements, true)}`, 
                    pathName: "/student-transfer"
                }
            ]
        },
        {
            title: "staff",
            subItems: [
                {
                    icon: userGroup,
                    label: "Staff registry",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Enrollment-Staff",
                    route:`enrollment-teacher?${subItemRoute(locationParms.slice(1), 'staff', filterDataElements)}`, 
                    pathName: "/enrollment-teacher"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Attendance-Staff",
                    route: `staff-attendance?${subItemRoute(locationParms.slice(1), 'staff', filterDataElements)}`, 
                    pathName: "/staff-attendance"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Staff-Transfer",
                    route: `staff-transfer?${subItemRoute(locationParms.slice(1), 'staff', filterDataElements, true)}`, 
                    pathName: "/staff-transfer"
                }
            ]
        }
    ]
}
export { sideBarData }
