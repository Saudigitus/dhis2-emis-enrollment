import { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { useShowAlerts, useGetEnrollment, useHeader } from '../../hooks';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatCamelCaseToWords } from '../../utils/commons/formatCamelCaseToWords';

export default function useGetEnrollmentDeleteFormData() {
    const { show } = useShowAlerts()
    const { getEnrollment } = useGetEnrollment()
    const { getDataStoreData } = getSelectedKey()
    const [initialValues, setInitialValues] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const programConfig = useRecoilValue(ProgramConfigState)
    const { columns } = useHeader()


    const buildDeleteFormData = (trackedEntity: string, enrollment: string) => {
        const { 'socio-economics': { programStage }, registration, filters } = getDataStoreData

        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {
            const events: any[] = []
            const registrationInfo: any[] = []

            getEnrollment(enrollment)
                .then((resp: any) => {
                    programConfig.programStages?.filter(x => x.id !== programStage && x.id !== registration.programStage).map((value) => {
                        const event = resp?.results?.events?.filter((x: any) => x.programStage === value.id && x.dataValues.length)
                        events.push({
                            name: value.displayName,
                            value: event?.length,
                            repeatable: value.repeatable,
                            class: event?.length ? 'greenIcon' : 'redIcon',
                            label: value.repeatable ? `${value.displayName.toLowerCase() + "s"}` : event?.length ? "value assigned" : 'no value assigned'

                        })
                    })

                    const registrationEvent = resp?.results?.events?.find((x: any) => x.programStage == registration.programStage)

                    filters?.dataElements.map((filter: any) => {
                        registrationInfo.push({
                            code: formatCamelCaseToWords(filter.code),
                            value: registrationEvent?.dataValues?.find((x: any) => x.dataElement === filter.dataElement)?.value ?? "Not set",
                        })
                    })

                    setInitialValues({
                        events: events,
                        enrollment: enrollment,
                        trackedEntity: trackedEntity,
                        registration: registrationInfo,
                        attributes: resp?.results?.attributes?.filter((attribute: any) => columns.find((column: any) => column.id == attribute.attribute && column.visible)),
                    })
                    setLoading(false)
                })
                .catch((error: any) => {
                    show({ message: `Could not load enrollment data for delete: ${error.message}`, critical: true })
                })
        }


    }

    return { loading, buildDeleteFormData, initialValues }
}