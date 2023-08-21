import { z } from "zod";
import {atom} from "recoil";

const booleanStringTransformer = (str: string): string => {
    if (str === "false" || str === "no") return "No";
    if (str === "true" || str === "yes") return "Yes";
    return "No"
    // throw new Error("Invalid boolean string");
};
// Define the EnrollmentDetails schema
export const EnrollmentDetailsSchema = z.object({
    schoolName: z.string(),
    schoolUID: z.string().min(11, { message: "SchoolUID must be 11 characters long" }),
    enrollmentDate: z.date(),
    academicYear: z.string().or(z.number()),
    grade: z.string(),
    studentClass: z.string()
});

// Define the StudentProfile schema
export const StudentProfileSchema = z.object({
    systemID: z.string(),
    studentID: z.string(),
    firstName: z.string(),
    surName: z.string(),
    dateOfBirth: z.date(),
    sex: z.string(),
    nationality: z.string()
});

// Define the SocialEconomicDetails schema
export const SocialEconomicDetailsSchema = z.object({
    specialNeeds: z.string().transform(booleanStringTransformer),
    healthIssues: z.string().transform(booleanStringTransformer),
    practicalSkills: z.string().transform(booleanStringTransformer),
    talents: z.string().transform(booleanStringTransformer)
})

// Define the EnrollmentObject schema
export const EnrollmentObjectSchema = z.object({
    EnrollmentDetails: EnrollmentDetailsSchema,
    StudentProfile: StudentProfileSchema,
    SocialEconomicDetails: SocialEconomicDetailsSchema
});
export type StudentProfile = z.infer<typeof StudentProfileSchema>;

export type EnrollmentObject = z.infer<typeof EnrollmentObjectSchema>;

interface AttributeConf {
    id: string
    name: string
}
export type AttributeAlias = Record<string, AttributeConf>;

const AttributeAliases: AttributeAlias = {
    studentID: {id: "", name: "System ID"},
    systemID: {id: "G0B8B0AH5Ek", name: "System ID"},
    // schoolName: {id: "", name: ""},
    enrollmentDate: {id: "", name: ""},
    academicYear: {id: "iDSrFrrVgmX", name: "Academic Year"},
    firstName: {id: "gz8w04YBSS0", name: "First name"},
    surName: {id: "ZIDlK6BaAU2", name: "Surname"},
    dateOfBirth: {id: "EPYqXuM0M2u", name: "Date of birth"},
    sex: {id: "TYtSbc1BFES", name: "Gender"},
    grade: {id: "kNNoif9gASf", name: "Grade"},
    studentClass: {id: "RhABRLO2Fae", name: "Class/Section"},
    nationality: {id: "wGiRDfHT0hj", name: "Nationality"},
    specialNeeds: {id: "xOiyqnsPZS7", name: "Special needs?"},
    healthIssues: {id: "ReiryBkZcCT", name: "Health Issues?"},
    practicalSkills: {id: "sImY1RsfcWN", name: "Practical skills?"},
    talents: {id: "UgCcMc10Dsw", name: "Talents?"}
};
export const TEAttributeAliasState = atom<AttributeAlias>({
    key: "trackedEntity-Attribute-Aliases",
    default: AttributeAliases
})
