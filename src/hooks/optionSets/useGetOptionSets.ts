import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { OptionSetsState } from '../../schema/optionSetsSchema';
import useShowAlerts from '../commons/useShowAlert';

const OPTIONSETS_QUERY = (id: string) => ({
    result: {
        resource: "optionSets",
        id,
        params: {
            fields: "options[code,name,id,displayName],name,displayName,id"
        }
    }
})

function useGetOptionSets({ optionSetId }: { optionSetId: string }) {
    const { hide, show } = useShowAlerts()
    const setOptionSetsState = useSetRecoilState(OptionSetsState);
    const getOptionSetsState = useRecoilValue(OptionSetsState);
    const { data, loading, error } = useDataQuery<{ result: any }>(OPTIONSETS_QUERY(optionSetId), {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    useEffect(() => {
        const localData = { ...getOptionSetsState, [optionSetId]: data?.result }
        setOptionSetsState(localData)
    }, [loading])

    return { data, loading, error }
}
export { useGetOptionSets }
