import { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { VariablesTypes } from '../../types/variables/AttributeColumns';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { useShowAlerts, useGetEnrollment, useHeader, useGetDataElements } from '../../hooks';
import { formatFormSection, getinitialValuesDisplayName } from '../../utils/constants/enrollmentForm/deleteEnrollmentForm';

export default function useGetEnrollmentDeleteFormData() {
    const { show } = useShowAlerts()
    const { columns } = useHeader()
    const { getEnrollment } = useGetEnrollment()
    const { getDataStoreData } = getSelectedKey()
    const [loading, setLoading] = useState<boolean>(false)
    const programConfig = useRecoilValue(ProgramConfigState)
    const [initialValues, setInitialValues] = useState<any>({})
    const { dataElements } = useGetDataElements({ programStageId: getDataStoreData.registration.programStage })


    const buildDeleteFormData = (trackedEntity: string, enrollment: string) => {
        const { 'socio-economics': { programStage }, registration } = getDataStoreData

        setLoading(true)
        if (Object.keys(getDataStoreData)?.length) {
            const events: any[] = []

            getEnrollment(enrollment)
                .then((resp: any) => {
                    programConfig.programStages?.filter(x => x.id !== programStage && x.id !== registration.programStage).map((value) => {
                        const event = resp?.results?.events?.filter((x: any) => x.programStage === value.id && x.dataValues.length)
                        events.push({
                            name: value.displayName,
                            value: event?.length,
                            repeatable: value.repeatable,
                            class: event?.length ? 'hasValuesColor' : 'noValuesColor',
                            label: value.repeatable ?
                                event?.length ? `${value.displayName + "s"}` : `No ${value.displayName.toLowerCase() + "s"}`

                                : event?.length ? "Value assigned" : 'No value assigned'

                        })
                    })

                    const registrationValues = resp?.results?.events?.find((x: any) => x.programStage == registration.programStage)

                    setInitialValues({
                        events: events,
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

                    setLoading(false)
                })
                .catch((error: any) => {
                    show({ message: `Could not load enrollment data for delete: ${error.message}`, critical: true })
                })
        }


    }

    return { loading, buildDeleteFormData, initialValues }
}