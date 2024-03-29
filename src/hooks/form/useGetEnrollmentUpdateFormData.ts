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

    const buildFormData = (trackedEntity: string) => {
        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {
            const { registration, 'socio-economics': { programStage }, program } = getDataStoreData

            getTei(program, orgUnit as unknown as string, trackedEntity)
                .then(async (trackedEntityInstance: any) => {

                    await getEvent(program, registration.programStage as unknown as string, headerFieldsState.dataElements, orgUnit as unknown as string, trackedEntity)
                        .then(async (registration: any) => {

                            await getEvent(program, programStage as unknown as string, [], orgUnit as unknown as string, trackedEntity)
                                .then((socioEconomic: any) => {
                                    setInitialValues({
                                        trackedEntity: trackedEntity,
                                        ...dataValues(registration?.results?.instances[0]?.dataValues ?? []),
                                        ...dataValues(socioEconomic?.results?.instances[0]?.dataValues ?? []),
                                        ...attributes(trackedEntityInstance?.results?.instances[0]?.attributes ?? []),
                                        orgUnit: registration?.results?.instances[0]?.orgUnit,
                                        enrollment: registration?.results?.instances[0]?.enrollment,
                                        enrollmentDate: registration?.results?.instances[0]?.createdAt,
                                        program: trackedEntityInstance?.results?.instances[0]?.enrollments?.[0]?.program,
                                        eventdatestaticform: registration?.results?.instances[0]?.createdAt ? format(new Date(registration?.results?.instances[0]?.createdAt), "yyyy-MM-dd") : undefined,
                                    })
                                    setEnrollmentValues({
                                        events: [registration?.results?.instances[0], socioEconomic?.results?.instances[0]]
                                    })

                                    setLoading(false)
                                })
                        })
                })
                .catch((error) => {
                    setLoading(false)
                    setError(true)
                    show({
                        message: `${("Could not get data")}: ${error.message}`,
                        type: { critical: true }
                    });
                })
        }
    }

    return { enrollmentValues, buildFormData, initialValues, loading, error, setInitialValues }
}