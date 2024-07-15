import { useState } from 'react'
import { useGetEvent, useParams, useShowAlerts, useSearchTei } from '..';
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys';
import { formatResponseData } from '../../utils/tei/formatResponseData';
import { attributes } from '../../utils/table/rows/formatResponseRows';
import { EventQueryResults } from '../../types/api/WithoutRegistrationProps';
import { getRecentEvent } from '../../utils/tei/getRecentEnrollment';

export default function useSearchEnrollments() {
    const { getTeiSearch } = useSearchTei()
    const { getEvent } = useGetEvent()
    const { urlParamiters } = useParams()
    const { show } = useShowAlerts()
    const { registration, program, socioEconomics, transfer } = getDataStoreKeys()
    const [enrollmentValues, setEnrollmentValues] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [totalResults, setTotalResults] = useState<any>(null);

    const getEnrollmentsData = (filters: string, setShowResults: any) => {
        const teisWithRegistrationEvents: any[] = [];
        const fields: string = "event,trackedEntity,enrollment,occurredAt,dataValues[dataElement,value],orgUnitName,orgUnit"
        setLoading(true)
        getTeiSearch(program, filters)
            .then(async (teiResponse: any) => {

                for (const tei of teiResponse?.results?.instances) {
                    let socioEconomicsResponse: any = {}

                    const registrationResponse = await getEvent(program, registration.programStage as unknown as string, [], tei?.trackedEntity, fields)
                    if (socioEconomics) socioEconomicsResponse = await getEvent(program, socioEconomics.programStage as unknown as string, [], tei?.trackedEntity, fields)
                    const transfersResponse = await getEvent(program, transfer.programStage as unknown as string, [], tei?.trackedEntity, fields) as unknown as EventQueryResults
                    const lastTransfer = getRecentEvent(transfersResponse?.results?.instances)
                    console.log("Tranfer Response: ", transfersResponse)
                    console.log("LastTransfer: ", lastTransfer)


                    const registrationEvents = formatResponseData("WITHOUT_REGISTRATION", registrationResponse?.results?.instances)
                    const socioEconomicsEvents = formatResponseData("WITHOUT_REGISTRATION", socioEconomicsResponse?.results?.instances)
                    teisWithRegistrationEvents.push({ ...tei, enrollmentsNumber: registrationEvents?.length, registrationEvents, socioEconomicsEvents, mainAttributesFormatted: attributes(tei?.attributes), ...attributes(tei?.attributes), ownershipOu: tei?.programOwners[0]?.orgUnit })
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