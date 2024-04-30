
export function checkEnrolledAcademicYear(registrationEvents: any[], selectedAcademicYear: string, academicYearId: string): boolean {
    for (const event of registrationEvents) {
        if (event[academicYearId] === selectedAcademicYear) {
            return true;
        }
    }
    return false;
}