import { useState, useEffect } from 'react'
import { format } from 'date-fns';
import { useGetTei, useGetEvent, useParams } from '../../hooks';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { attributes, dataValues } from '../../utils/table/rows/formatResponseRows';

export default function useGetEnrollmentUpdateFormData (trackedEntity: string ) {
    const { getTei } = useGetTei()
    const { getEvent } = useGetEvent()
    const {  urlParamiters } = useParams()
    const { school : orgUnit } = urlParamiters()
    const { getDataStoreData } = getSelectedKey()
    const [enrollmentValues, setEnrollmentValues] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [initialValues, setInitialValues ] =  useState<any>({})

    const buildFormData =  async () => {
        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {
            const { registration, 'socio-economics': { programStage }, program } = getDataStoreData

           await getTei(program, orgUnit as unknown as string, trackedEntity )
            .then( async (trackedEntityInstance: any ) => {
                
                    await getEvent(program, registration.programStage as unknown as string, [], orgUnit as unknown as string, trackedEntity)
                    .then( async ( registration: any ) => {
                    
                        await getEvent(program, programStage as unknown as string, [], orgUnit as unknown as string, trackedEntity)
                            .then(( socioEconomic: any ) => {
                                setInitialValues({
                                    trackedEntity: trackedEntity,
                                    ...dataValues(registration?.results?.instances[0]?.dataValues ?? []),
                                    ...dataValues(socioEconomic?.results?.instances[0]?.dataValues ?? []),
                                    ...attributes(trackedEntityInstance?.results?.instances[0]?.attributes ?? []),
                                    enrollmentDate:  trackedEntityInstance?.results?.instances[0]?.createdAt,
                                    orgUnitId: trackedEntityInstance?.results?.instances[0]?.enrollments?.[0]?.orgUnit,
                                    programId: trackedEntityInstance?.results?.instances[0]?.enrollments?.[0]?.program,
                                    enrollmentId: trackedEntityInstance?.results?.instances[0]?.enrollments?.[0]?.enrollment,
                                    eventdatestaticform:format(new Date (trackedEntityInstance?.results?.instances[0]?.createdAt), "yyyy-MM-dd"),
                                })
                                setEnrollmentValues({
                                    trackedEntity: trackedEntityInstance?.results?.instances[0],
                                    events: [
                                        registration?.results?.instances[0],
                                        socioEconomic?.results?.instances[0]
                                    ]
                                })
                                setLoading(false)
                            })
                        
                    })
            })
   
        }
    }

    return { enrollmentValues, buildFormData, initialValues, loading }
}
