const getRecentEnrollment = (enrollments: any[]) => {
    let enrollment = enrollments[0];
    for (let i = 0; i < enrollments.length; i++) {
        if (new Date(enrollment.enrolledAt) < new Date(enrollments[i].enrolledAt)) {
            enrollment = enrollments[i]
        }
    }
    return enrollment
}

const getRecentEvent = (events: any[]) => {
    let event = events[0];
    for (let i = 0; i < events.length; i++) {
        if (new Date(event.occurredAt) < new Date(events[i].occurredAt)) {
            event = events[i]
        }
    }
    return event
}

export { getRecentEnrollment, getRecentEvent }