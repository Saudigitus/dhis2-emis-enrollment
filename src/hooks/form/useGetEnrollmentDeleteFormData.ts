import { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { VariablesTypes } from '../../types/variables/AttributeColumns';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { useShowAlerts, useGetEnrollment, useHeader, useGetDataElements } from '../../hooks';
import { formatFormSection, getinitialValuesDisplayName } from '../../utils/constants/enrollmentForm/deleteEnrollmentForm';
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys';

export default function useGetEnrollmentDeleteFormData() {
    const { show } = useShowAlerts()
    const { columns } = useHeader()
    const { getEnrollment } = useGetEnrollment()
    const { getDataStoreData } = getSelectedKey()
    const [loading, setLoading] = useState<boolean>(false)
    const programConfig = useRecoilValue(ProgramConfigState)
    const [initialValues, setInitialValues] = useState<any>({})
    const { socioEconomics, registration } = getDataStoreKeys()
    const { dataElements } = useGetDataElements({ programStageId: getDataStoreData.registration.programStage })
    const { programStages } = programConfig


    const buildDeleteFormData = (trackedEntity: string, enrollment: string) => {

        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {

            getEnrollment(enrollment)
                .then((resp: any) => {
                    const registrationValues = resp?.results?.events?.find((x: any) => x.programStage == registration.programStage)

                    const enrollmentEvents = programStages?.filter((programStage: { id: string }) => programStage.id !== socioEconomics?.programStage && programStage.id !== registration?.programStage)?.map((value) => {

                        const event = resp?.results?.events?.filter((event: { programStage: string, dataValues: any[] }) => event.programStage === value.id && event.dataValues.length)

                        return {
                            name: value.displayName,
                            value: event?.length,
                            repeatable: value.repeatable,
                            class: event?.length ? 'hasValuesColor' : 'noValuesColor',
                            label: value.repeatable ? event?.length ? `${value.displayName + "s"}` : `No ${value.displayName.toLowerCase() + "s"}` : event?.length ? "Value assigned" : 'No value assigned'

                        }
                    })

                    setInitialValues({
                        events: enrollmentEvents,
                        enrollment: enrollment,
                        trackedEntity: trackedEntity,
                        registration: formatFormSection(dataElements),
                        initialValues: getinitialValuesDisplayName(registrationValues?.dataValues, resp?.results?.attributes, programConfig),
                        attributes: formatFormSection(
                            columns.filter((column) => (column?.searchable || column?.unique || column?.required) && column?.type == VariablesTypes.Attribute).length > 4 ?
                                columns.filter((column) => (column?.searchable || column?.unique || column?.required) && column?.type == VariablesTypes.Attribute) :
                                columns.filter((column) => column?.type == VariablesTypes.Attribute && column.visible)?.slice(0, 4)
                        ),
                    })
                })

                .catch((error: { message: string }) => {
                    show({ message: `Could not load enrollment data for delete: ${error.message}`, critical: true })
                })

                .finally(() => { setLoading(false) })
        }


    }

    return { loading, buildDeleteFormData, initialValues }
}