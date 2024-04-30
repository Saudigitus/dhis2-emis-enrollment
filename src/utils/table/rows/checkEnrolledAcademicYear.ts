
export function checkEnrolledAcademicYear(registrationEvents: any[], selectedAcademicYear: string, academicYearId: string): boolean {
    console.log("registrtionsEvents", registrationEvents[0]["trackedEntity"], selectedAcademicYear);
    for (const event of registrationEvents) {
        console.log("first", event[academicYearId])
        if (event[academicYearId] === selectedAcademicYear) {
            return true;
        }
    }
    return false;
}