
export function checkEnrolledAcademicYear(registrationEvents: any[], selectedAcademicYear: string, academicYearId: string, selectedSchool: string, sectionType: string): boolean {
    if(sectionType === 'staff'){
        for (const event of registrationEvents.filter((ev) => ev[academicYearId] === selectedAcademicYear)) {
            if (event["orgUnitId"] === selectedSchool) {
                return true;
            }
        }
    }else {
        for (const event of registrationEvents) {
            if (event[academicYearId] === selectedAcademicYear) {
                return true;
            }
        }
    }
    
    return false;
}