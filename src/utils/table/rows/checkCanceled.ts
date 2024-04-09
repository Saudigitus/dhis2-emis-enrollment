import { EnrollmentStatus } from "../../../types/api/WithRegistrationProps"

export function checkCanceled(status: string): boolean {
    return EnrollmentStatus.CANCELLED === status
}