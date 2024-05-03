const getRecentEnrollment = (enrollments: any[]) => {
    let enrollment = enrollments[0];
    for (let i = 0; i < enrollments.length; i++) {
        if (new Date(enrollment.enrolledAt) < new Date(enrollments[i].enrolledAt)) {
            enrollment = enrollments[i]
        }
    }
    return enrollment
}

export { getRecentEnrollment }