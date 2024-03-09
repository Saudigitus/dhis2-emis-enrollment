import { useState } from 'react'
import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';
import { useRecoilState, useRecoilValue } from "recoil";
import { TeiRefetch } from "../../schema/refecthTeiSchema";
import { EventsState } from '../../schema/eventsSchema';
import { RowSelectionState } from '../../schema/tableSelectedRowsSchema';
import { format } from 'date-fns';

const BULK_UPDATE: any = {
    resource: 'tracker',
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        importStrategy: 'UPDATE',
        async: false
    }
}

export default function useBulkUpdate() {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState(TeiRefetch)
    const [mutate, mutateState] = useDataMutation(BULK_UPDATE)
    const [loading, setLoading] = useState(false)
    const events = useRecoilValue(EventsState)
    const selected = useRecoilValue(RowSelectionState);

    const updateClass = async (value: any) => {
        setLoading(true)
        let eventsToUpdate: any = []
        
        if (selected.isAllRowsSelected) {
            eventsToUpdate = events
        } else {
            const teisToUpdate = selected.selectedRows.map((x: any) => x.trackedEntity)
            eventsToUpdate = events.filter(x => teisToUpdate.indexOf(x.trackedEntity) !== -1)
        }

        const updateClass = eventsToUpdate.map((x: any) => {
            return {
                ...x, dataValues: x?.dataValues?.map((dataValue: any) => {
                    if (dataValue.dataElement === 'RhABRLO2Fae') {
                        return { dataElement: 'RhABRLO2Fae', value: value.RhABRLO2Fae }
                    } else return dataValue
                })
            }
        })

        await mutate({ data: { events: updateClass } }).then(() => {
            show({ message: "Update completed successfully", type: { success: true } })
            setRefetch(!refetch)
            setLoading(false)
        })
            .catch((error) => show({ message: "Error", type: { success: true } }))
    }

    return {
        loading,
        updateClass
    }
}
