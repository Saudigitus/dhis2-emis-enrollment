export const enrollmentUpdateBody = (enrollment: any, enrolledAt: string) => {

    return {
        enrollment:
        {
            ...enrollment,
            enrolledAt: enrolledAt,
            occurredAt: enrolledAt,
        }
    }
};