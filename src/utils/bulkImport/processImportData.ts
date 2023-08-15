import { type UploadTemplate} from "../../types/bulkImport/TemplateFormat";
import {EnrollmentObjectSchema, type EnrollmentObject} from "../../schema/importSchema";
export const processData = (data: UploadTemplate): any => {
    var validRecords: EnrollmentObject[] = []
    data.Enrollments.slice(1).forEach((v: any) => {
        // const {schoolName, schoolID, ...rest} = v
        const {
            schoolName, schoolUID, enrollmentDate, academicYear, grade,
            studentID, firstName, surName, dateOfBirth, sex, nationality,
            specialNeeds, healthIssues, practicalSkills, talents
        } = v

        const data = {
            EnrollmentDetails: {
                schoolName,
                schoolUID,
                enrollmentDate,
                academicYear,
                grade,
                class: v.class
            },
            StudentProfile: {
                studentID,
                firstName,
                surName,
                dateOfBirth,
                sex,
                nationality
            },
            SocialEconomicDetails: {
                specialNeeds,
                healthIssues,
                practicalSkills,
                talents
            }
        }
        const validationResult = EnrollmentObjectSchema.safeParse(data);
        if (validationResult.success) {
            validRecords.push(validationResult.data)
            // validRecords = [...validRecords, validationResult.data]
        } else {
            console.log("Invalid data", validationResult.error, v)
        }
    })

    return validRecords
}
