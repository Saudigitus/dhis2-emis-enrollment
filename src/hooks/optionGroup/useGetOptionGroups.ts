import { useRecoilState } from "recoil";
import { useDataQuery } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { useEffect } from "react";
import { OptionGroupsConfig, OptionGroupsConfigState } from "../../schema/optionGroupsSchema";

const OPTION_GROUPS_QUERY = {
    results: {
        resource: "optionGroups",
        params: {
            fields: "id,options[code~rename(value),displayName~rename(label)]",
            paging: false

        }
    }
}

type OptionGroupsQueryResponse = {
    results: {
        optionGroups: OptionGroupsConfig[]
    }
}

export function useGetOptionGroups() {
    const { hide, show } = useShowAlerts()
    const [, setOptionGroupsConfigState] = useRecoilState(OptionGroupsConfigState);

    const { data, loading: loadingOptionGroups, refetch } = useDataQuery<OptionGroupsQueryResponse>(OPTION_GROUPS_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get option groups")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(response) {
            setOptionGroupsConfigState(response?.results?.optionGroups);
        },
        lazy: true
    })

    useEffect(() => {
        void refetch()
    }, [])

    return { loadingOptionGroups, refetch }
}
