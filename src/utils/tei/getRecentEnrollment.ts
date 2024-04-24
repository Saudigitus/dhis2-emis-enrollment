const getRecentEnrollment = (enrollments: any[]) => {
    let enrollment = enrollments[0];
    for (let i = 0; i < enrollments.length; i++) {
        if (new Date(enrollment.createdAt) < new Date(enrollments[i].createdAt)) {
            enrollment = enrollments[i]
        }
    }
    return enrollment
}

export { getRecentEnrollment }