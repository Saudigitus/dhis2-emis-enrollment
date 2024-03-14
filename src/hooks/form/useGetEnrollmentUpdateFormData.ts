import { useState } from 'react'
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { useGetTei, useGetEvent, useParams, useShowAlerts } from '../../hooks';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { attributes, dataValues } from '../../utils/table/rows/formatResponseRows';
import { HeaderFieldsState } from '../../schema/headersSchema';

export default function useGetEnrollmentUpdateFormData () {
    const { getTei } = useGetTei()
    const { getEvent } = useGetEvent()
    const {  urlParamiters } = useParams()
    const { hide, show } = useShowAlerts()
    const { school : orgUnit } = urlParamiters()
    const { getDataStoreData } = getSelectedKey()
    const [enrollmentValues, setEnrollmentValues] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [initialValues, setInitialValues ] =  useState<any>({})
    const headerFieldsState = useRecoilValue(HeaderFieldsState)

    const buildFormData =  (trackedEntity: string, enrollmentId: string) => {
        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {
            const { registration, 'socio-economics': { programStage }, program } = getDataStoreData

        getTei(program, orgUnit as unknown as string, trackedEntity )
            .then( async (trackedEntityInstance: any ) => {
                
                    await getEvent(program, registration.programStage as unknown as string, headerFieldsState.dataElements, orgUnit as unknown as string, trackedEntity)
                    .then( async ( registration: any ) => {
                    
                        await getEvent(program, programStage as unknown as string, headerFieldsState.dataElements, orgUnit as unknown as string, trackedEntity)
                            .then(( socioEconomic: any ) => {
                                setInitialValues({
                                    trackedEntity: trackedEntity,
                                    ...dataValues(registration?.results?.instances[0]?.dataValues ?? []),
                                    ...dataValues(socioEconomic?.results?.instances[0]?.dataValues ?? []),
                                    ...attributes(trackedEntityInstance?.results?.instances[0]?.attributes ?? []),
                                    orgUnit: registration?.results?.instances[0]?.orgUnit,
                                    enrollment: registration?.results?.instances[0]?.enrollment,
                                    enrollmentDate:  registration?.results?.instances[0]?.createdAt,
                                    program: trackedEntityInstance?.results?.instances[0]?.enrollments?.[0]?.program,
                                    eventdatestaticform:format(new Date (trackedEntityInstance?.results?.instances[0]?.createdAt), "yyyy-MM-dd"),
                                })
                                setEnrollmentValues({
                                    trackedEntity: trackedEntityInstance?.results?.instances[0],
                                    events: [
                                        registration?.results?.instances[0] ?? 
                                        {...trackedEntityInstance?.results?.instances[0]?.enrollments?.find((enrollment: any) => enrollment.enrollment === enrollmentId).events?.find((event: any) => event.programStage === registration.programStage), enrollment: enrollmentId},

                                        socioEconomic?.results?.instances[0] ?? 
                                        {...trackedEntityInstance?.results?.instances[0]?.enrollments?.find((enrollment: any) => enrollment.enrollment === enrollmentId)?.events?.find((event: any) => event.programStage === programStage),enrollment: enrollmentId},
                                    ]
                                })
                            
                                setLoading(false)
                            })
                            .catch((error) => {
                                show({
                                    message: `${("Could not get data")}: ${error.message}`,
                                    type: { critical: true }
                                });
                                setLoading(false)
                            })
                    })
                    .catch((error) => {
                        show({
                            message: `${("Could not get data")}: ${error.message}`,
                            type: { critical: true }
                        });
                        setLoading(false)
                    })
            })
            .catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setLoading(false)
            })
        }
    }

    return { enrollmentValues, buildFormData, initialValues, loading, setInitialValues }
}