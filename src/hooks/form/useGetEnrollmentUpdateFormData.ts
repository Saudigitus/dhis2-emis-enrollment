import { useState } from 'react'
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { useGetTei, useGetEvent, useParams, useShowAlerts } from '../../hooks';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { attributes, dataValues } from '../../utils/table/rows/formatResponseRows';
import { HeaderFieldsState } from '../../schema/headersSchema';
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys';

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
    const { registration, socioEconomics, program } = getDataStoreKeys()

    const buildFormData = (trackedEntity: string, enrollment: string) => {

        setLoading(true)

        if (Object.keys(getDataStoreData)?.length) {

            try {
                getTei(program, orgUnit as string, trackedEntity)
                    .then(async (trackedEntityInstance: any) => {
                        let socioEconomicData: any = {}

                        const registrationData: any = await getEvent(program, registration.programStage as string, headerFieldsState.dataElements, trackedEntity, "*", orgUnit as string)
                        if (socioEconomics){
                            socioEconomicData = await getEvent(program, socioEconomics?.programStage as string, [], trackedEntity, "*", orgUnit as string)
                        }

                        setInitialValues({
                            enrollment: enrollment,
                            trackedEntity: trackedEntity,
                            ...attributes(trackedEntityInstance?.results?.instances[0]?.attributes ?? []),
                            program: trackedEntityInstance?.results?.instances[0]?.enrollments?.[0]?.program,
                            orgUnit: registrationData?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.orgUnit,
                            enrollmentDate: registrationData?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.occurredAt,
                            ...dataValues(registrationData?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.dataValues ?? []),
                            ...dataValues(socioEconomicData?.results?.instances.find((x: any) => x.enrollment === enrollment)?.dataValues ?? []),
                            enrollment_date: registrationData?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.occurredAt ? format(new Date(registrationData?.results?.instances?.find((x: any) => x.enrollment === enrollment)?.occurredAt), "yyyy-MM-dd") : undefined,
                        })

                        setEnrollmentValues({
                            events: [
                                registrationData?.results?.instances?.find((x: any) => x.enrollment === enrollment) ?? { enrollment: enrollment, programStage: registrationData },
                                socioEconomicData?.results?.instances.find((x: any) => x.enrollment === enrollment) ?? { enrollment: enrollment, programStage: socioEconomics },
                            ]
                        })

                    })
            }

            catch (error: any) {
                setError(true)
                show({
                    message: `${("Could not get selected enrollment details")}: ${error.message}`,
                    type: { critical: true }
                });
            }

            finally {
                setLoading(false)
            }
        }
    }

    return { enrollmentValues, buildFormData, initialValues, loading, error, setInitialValues }
}