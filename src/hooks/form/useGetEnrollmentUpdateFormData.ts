import { useState } from 'react'
import { format } from 'date-fns';
import { useGetEnrollment } from '../../hooks';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { attributes, dataValues } from '../../utils/table/rows/formatResponseRows';

export default function useGetEnrollmentUpdateFormData () {
    const { getEnrollment } = useGetEnrollment()
    const { getDataStoreData } = getSelectedKey()
    const [loading, setLoading] = useState<boolean>(false)
    const [initialValues, setInitialValues ] =  useState<any>({})
    const [enrollmentValues, setEnrollmentValues] = useState<any>({})

    const buildFormData =  (enrollment: string) => {
        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {
            const { registration, 'socio-economics': { programStage }, program } = getDataStoreData

            getEnrollment(enrollment)
            .then(( enrollment: any ) => {

                setInitialValues({
                    trackedEntity: enrollment?.results?.trackedEntity,
                    ...dataValues(enrollment?.results?.events?.find((event: any) => event.programStage === registration.programStage)?.dataValues ?? []),
                    ...dataValues(enrollment?.results?.events?.find((event: any) => event.programStage === programStage)?.dataValues ?? []),
                    ...attributes(enrollment?.results?.attributes ?? []),
                    orgUnit: enrollment?.results?.orgUnit,
                    enrollment: enrollment?.results?.enrollment,
                    enrollmentDate:  enrollment?.results?.createdAt,
                    program: enrollment?.results?.enrollments?.[0]?.program,
                    eventdatestaticform:format(new Date (enrollment?.results?.createdAt), "yyyy-MM-dd"),
                })
                setEnrollmentValues({
                    trackedEntity: enrollment?.results?.attributes,
                    events: [
                        enrollment?.results?.events?.find((event: any) => event.programStage === registration.programStage) ?? [] ?? {},
                        enrollment?.results?.events?.find((event: any) => event.programStage === programStage) ?? [] ?? {}
                    ]
                })
                setLoading(false)
            })
        }
    }

    return { enrollmentValues, buildFormData, initialValues, loading, setInitialValues }
}
