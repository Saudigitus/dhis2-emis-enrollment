import { useState } from 'react'
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { useGetTei, useGetEvent, useParams, useShowAlerts } from '../../hooks';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { attributes, dataValues } from '../../utils/table/rows/formatResponseRows';
import { HeaderFieldsState } from '../../schema/headersSchema';

export default function useGetEnrollmentUpdateFormData() {
    const { getTei } = useGetTei()
    const { getEvent } = useGetEvent()
    const { urlParamiters } = useParams()
    const { show } = useShowAlerts()
    const { school: orgUnit } = urlParamiters()
    const { getDataStoreData } = getSelectedKey()
    const [enrollmentValues, setEnrollmentValues] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState<any>({})
    const headerFieldsState = useRecoilValue(HeaderFieldsState)

    const buildFormData = (trackedEntity: string, enrollment: string) => {

        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {
            const { registration, 'socio-economics': { programStage }, program } = getDataStoreData

            getTei(program, orgUnit as unknown as string, trackedEntity)
                .then(async (trackedEntityInstance: any) => {

                    await getEvent(program, registration.programStage as unknown as string, headerFieldsState.dataElements, trackedEntity, "*", orgUnit as unknown as string)
                        .then(async (registration: any) => {

                            await getEvent(program, programStage as unknown as string, [], trackedEntity, "*", orgUnit as unknown as string)
                                .then((socioEconomic: any) => {
                                    setInitialValues({
                                        trackedEntity: trackedEntity,
                                        ...dataValues(registration?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.dataValues ?? []),
                                        ...dataValues(socioEconomic?.results?.instances.find((x: any) => x.enrollment === enrollment)?.dataValues ?? []),
                                        ...attributes(trackedEntityInstance?.results?.instances[0]?.attributes ?? []),
                                        orgUnit: registration?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.orgUnit,
                                        enrollment: enrollment,
                                        enrollmentDate: registration?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.createdAt,
                                        program: trackedEntityInstance?.results?.instances[0]?.enrollments?.[0]?.program,
                                        eventdatestaticform: registration?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.createdAt ? format(new Date(registration?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.createdAt), "yyyy-MM-dd") : undefined,
                                    })
                                    setEnrollmentValues({
                                        events: [
                                            registration?.results?.instances?.find((x: any) => x.enrollment === enrollment) ?? { enrollment: enrollment, programStage : registration },
                                            socioEconomic?.results?.instances.find((x: any) => x.enrollment === enrollment) ?? { enrollment: enrollment, programStage : programStage },
                                        ]
                                    })

                                    setLoading(false)
                                })
                        })
                })
                .catch((error) => {
                    setLoading(false)
                    setError(true)
                    show({
                        message: `${("Could not get selected enrollment details")}: ${error.message}`,
                        type: { critical: true }
                    });
                })
        }
    }

    return { enrollmentValues, buildFormData, initialValues, loading, error, setInitialValues }
}