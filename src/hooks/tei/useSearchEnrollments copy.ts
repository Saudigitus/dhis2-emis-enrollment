import { useState } from 'react'
import { useGetEvent, useParams, useShowAlerts, useSearchTei } from '..';
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys';
import { formatResponseData } from '../../utils/tei/formatResponseData';
import { attributes } from '../../utils/table/rows/formatResponseRows';

export default function useSearchEnrollments() {
    const { getTeiSearch } = useSearchTei()
    const { getEvent } = useGetEvent()
    const { urlParamiters } = useParams()
    const { show } = useShowAlerts()
    const { school: orgUnit } = urlParamiters()
    const { registration, program, socioEconomics } = getDataStoreKeys()
    const [enrollmentValues, setEnrollmentValues] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [totalResults, setTotalResults] = useState<any>(null);

    const getEnrollmentsData = (filters: string, setShowResults: any) => {
        const teisWithRegistrationEvents: any[] = [];
        const fields: string = "event,trackedEntity,enrollment,dataValues[dataElement,value],orgUnitName,orgUnit"
        setLoading(true)
            getTeiSearch(program, filters)
                .then(async (teiResponse: any) => {

                    for (const tei of teiResponse?.results?.instances) {
                        await getEvent(program, registration.programStage as unknown as string, [], orgUnit as unknown as string, tei?.trackedEntity, fields)
                            .then( async (registrationResponse: any) => {
                                await getEvent(program, socioEconomics.programStage as unknown as string, [], orgUnit as unknown as string, tei?.trackedEntity, fields)
                                    .then((socioEconomicsResponse: any) => {
                                        teisWithRegistrationEvents.push({...tei, registrationEvents: formatResponseData("WITHOUT_REGISTRATION", registrationResponse?.results?.instances), socioEconomicsEvents: formatResponseData("WITHOUT_REGISTRATION", socioEconomicsResponse?.results?.instances), mainAttributesFormatted: attributes(tei?.attributes)})
                                    })
                            })
                    }

                    setEnrollmentValues(teisWithRegistrationEvents)
                    setLoading(false)
                    setShowResults(true)
                    setTotalResults(teiResponse.results.total || 0);
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

    return { enrollmentValues, setEnrollmentValues, getEnrollmentsData, loading, error, totalResults }
}