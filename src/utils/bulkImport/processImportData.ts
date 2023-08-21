import {type UploadTemplate} from "../../types/bulkImport/TemplateFormat";
import {
    EnrollmentObjectSchema,
    type EnrollmentObject,
    type AttributeAlias
} from "../../schema/importSchema";
import {type Attribute, type DataValue, type Enrollment, type ProgramEvent, type TrackedEntity} from "../../schema/trackerSchema";
import {type ProgramConfig} from "../../types/programConfig/ProgramConfig";
// import {generateUid} from "./uid";
import {fetchURL, getProgramStageID, getProgramTEAttributeID} from "./fetchTEIs";
// import {TrackedEntityAttribute} from "../../types/generated";
const parseDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
}
export const processData = async (
    data: UploadTemplate, programConfig: ProgramConfig, attrConf: AttributeAlias, baseURL: string) => {
    const validRecords: EnrollmentObject[] = [];
    for (const v of data.Enrollments.slice(1)) {
        const {
            schoolName,
            schoolUID,
            enrollmentDate,
            academicYear,
            grade,
            studentClass,
            studentID,
            firstName,
            surName,
            dateOfBirth,
            sex,
            nationality,
            specialNeeds,
            healthIssues,
            practicalSkills,
            talents
        } = v
        const systemIdAttribute = getProgramTEAttributeID(programConfig, "System ID")
        const url: string = `${baseURL}/api/trackedEntityAttributes/${systemIdAttribute}/generate?expiration=3`
        const {value: systemID} = await fetchURL(url)
        console.log("Generated System ID >>>", systemID)
        const data = {
            EnrollmentDetails: {
                schoolName,
                schoolUID,
                enrollmentDate,
                academicYear,
                grade,
                studentClass
            },
            StudentProfile: {
                systemID,
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
    }
    return createTrackerPayload(validRecords, programConfig, attrConf)
}

export const createTrackerPayload = (records: EnrollmentObject[], programConfig: ProgramConfig,
                                     attrConf: AttributeAlias): TrackedEntity[] => {
    const TEIs: TrackedEntity[] = [];
    records.forEach((r) => {
        // const teiId: string = generateUid()
        const attributes = Object.entries(r.StudentProfile).flatMap(([key, profile]) => {
            const value: string = (profile instanceof Date) ? parseDateString(profile) : profile
            if ((attrConf?.[key]?.id) !== undefined && (attrConf?.[key]?.id) !== "") {
                const val: Attribute = {
                    attribute: attrConf[key].id,
                    value
                }
                return val
            }
            return [];
        })
        const registrationDatavalues = Object.entries(r.EnrollmentDetails).flatMap(([key, registration]) => {
            const value: string | number = (registration instanceof Date) ? parseDateString(registration) : registration
            if ((attrConf?.[key]?.id) !== undefined && (attrConf?.[key]?.id) !== "") {
                const val: DataValue = {
                    dataElement: attrConf[key].id,
                    value
                }
                return val
            }
            return [];
        })
        const registrationEvent: ProgramEvent = {
            programStage: getProgramStageID(programConfig, "Enrollment details"),
            orgUnit: r.EnrollmentDetails.schoolUID,
            occurredAt: parseDateString(r.EnrollmentDetails.enrollmentDate),
            dataValues: registrationDatavalues
        }

        const socioEconDatavalues = Object.entries(r.SocialEconomicDetails).flatMap(([key, socialEcon]) => {
            // const value: string | number = (registration instanceof Date) ? parseDateString(registration) : registration
            if ((attrConf?.[key]?.id) !== undefined && (attrConf?.[key]?.id) !== "") {
                const val: DataValue = {
                    dataElement: attrConf[key].id,
                    value: socialEcon
                }
                return val
            }
            return [];
        })

        const socioEconEvent: ProgramEvent = {
            programStage: getProgramStageID(programConfig, "Socio-economics"),
            orgUnit: r.EnrollmentDetails.schoolUID,
            occurredAt: parseDateString(r.EnrollmentDetails.enrollmentDate),
            dataValues: socioEconDatavalues
        }

        const Term1Event: ProgramEvent = {
            programStage: getProgramStageID(programConfig, "Term 1"),
            orgUnit: r.EnrollmentDetails.schoolUID,
            occurredAt: parseDateString(r.EnrollmentDetails.enrollmentDate)
        }
        const Term2Event: ProgramEvent = {
            programStage: getProgramStageID(programConfig, "Term 2"),
            orgUnit: r.EnrollmentDetails.schoolUID,
            occurredAt: parseDateString(r.EnrollmentDetails.enrollmentDate)
        }
        const Term3Event: ProgramEvent = {
            programStage: getProgramStageID(programConfig, "Term 3"),
            orgUnit: r.EnrollmentDetails.schoolUID,
            occurredAt: parseDateString(r.EnrollmentDetails.enrollmentDate)
        }
        const FinalResultEvent: ProgramEvent = {
            programStage: getProgramStageID(programConfig, "Final result"),
            orgUnit: r.EnrollmentDetails.schoolUID,
            occurredAt: parseDateString(r.EnrollmentDetails.enrollmentDate)
        }
        const enrollment: Enrollment = {
            occurredAt: parseDateString(r.EnrollmentDetails.enrollmentDate),
            enrolledAt: parseDateString(r.EnrollmentDetails.enrollmentDate),
            // trackedEntity: teiId,
            program: programConfig.id,
            orgUnit: r.EnrollmentDetails.schoolUID,
            status: "ACTIVE",
            events: [
                registrationEvent, socioEconEvent, Term1Event,
                Term2Event, Term3Event, FinalResultEvent
            ]
        }
        const tei: TrackedEntity = {
            orgUnit: r.EnrollmentDetails.schoolUID,
            // trackedEntity: teiId,
            attributes,
            trackedEntityType: programConfig.trackedEntityType.id,
            enrollments: [enrollment]
        }
        TEIs.push(tei);
        // create tei
    })
    return TEIs;
}
