import { z } from "zod";

const booleanStringTransformer = (str: string) => {
    if (str === "false" || str === "no") return false;
    if (str === "true" || str === "yes") return true;
    return false
    // throw new Error("Invalid boolean string");
};
// Define the EnrollmentDetails schema
export const EnrollmentDetailsSchema = z.object({
    schoolName: z.string(),
    schoolUID: z.string().min(11, { message: "SchoolUID must be 11 characters long" }),
    enrollmentDate: z.date(),
    academicYear: z.string().or(z.number()),
    grade: z.string(),
    class: z.string()
});

// Define the StudentProfile schema
export const StudentProfileSchema = z.object({
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
});

// Define the EnrollmentObject schema
export const EnrollmentObjectSchema = z.object({
    EnrollmentDetails: EnrollmentDetailsSchema,
    StudentProfile: StudentProfileSchema,
    SocialEconomicDetails: SocialEconomicDetailsSchema
});

export type EnrollmentObject = z.infer<typeof EnrollmentObjectSchema>;
