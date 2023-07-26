import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { OptionSetsState } from '../../schema/optionSetsSchema';

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
    const { data, loading, error } = useDataQuery<{ result: any }>(OPTIONSETS_QUERY(optionSetId))
    const setOptionSetsState = useSetRecoilState(OptionSetsState);
    const getOptionSetsState = useRecoilValue(OptionSetsState);

    useEffect(() => {
        const localData = { ...getOptionSetsState, [optionSetId]: data?.result }
        setOptionSetsState(localData)
    }, [loading])

    return { data, loading, error }
}
export { useGetOptionSets }
