import enrollment from "../../../assets/images/home/enrollment.png";
import attendance from "../../../assets/images/home/attendance.png";
import calendar from "../../../assets/images/home/calendar.png";
import performance from "../../../assets/images/home/performance.png";
import transfer from "../../../assets/images/home/transfer.png";
import result from "../../../assets/images/home/result.png";
import { type DashboardCardProps } from "../../../types/dashboard/CardTypes";

function cardsData(): DashboardCardProps[] {
  return [
    {
      title: "Students",
      subItem: [
        {
          icon: enrollment,
          title: "Enrollment",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-enrollment",
          listLink: "list-enrollment"
        },
        {
          icon: attendance,
          title: "Attendance",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-attendance",
          listLink: "list-attendance"
        },
        {
          icon: performance,
          title: "Performance",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-performance",
          listLink: "list-performance"
        },
        {
          icon: result,
          title: "Final result",
          program: "programId",
          leftLabel: "Pending",
          formLink: "form-result",
          listLink: "list-result"
        },
        {
          icon: transfer,
          title: "Transfer",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-transfer",
          listLink: "list-transfer"
        }
      ]
    },
    {
      title: "Staff",
      subItem: [
        {
          icon: enrollment,
          title: "Teacher registry",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-teacher",
          listLink: "list-teacher"
        },
        {
          icon: enrollment,
          title: "Non-teacher registry",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-non-teacher",
          listLink: "list-non-teacher"
        },
        {
          icon: attendance,
          title: "Attendance",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-staff-attendance",
          listLink: "list-staff-attendance"
        },
        {
          icon: transfer,
          title: "Transfer",
          program: "programId",
          leftLabel: "Total",
          formLink: "form-staff-transfer",
          listLink: "list-staff-transfer"
        }
      ]
    },
    {
      title: "Academic Year",
      subItem: [
        {
          icon: calendar,
          title: "School Calendar",
          program: "programId",
          leftLabel: "School days",
          formLink: "form-school-calendar",
          listLink: "list-school-calendar"
        }
      ]
    }
  ];
}

export { cardsData };
