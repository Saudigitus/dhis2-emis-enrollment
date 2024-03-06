import { useRecoilState } from "recoil";
import { useDataQuery } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { useEffect } from "react";
import { OrgUnitsGroupsConfig, OrgUnitsGroupsConfigState } from "../../schema/orgUnitsGroupSchema";

const OPTION_GROUPS_QUERY = {
    results: {
        resource: "organisationUnitGroups",
        params: {
            fields: "code~rename(value),displayName~rename(label),organisationUnits[id~rename(value),displayName~rename(label)]",
            paging: false

        }
    }
}

type OrgUnitGroupsQueryResponse = {
    results: {
        organisationUnitGroups: OrgUnitsGroupsConfig[]
    }
}

export function useOrgUnitsGroups() {
    const { hide, show } = useShowAlerts()
    const [, setOrgUnitsGroupsConfigState] = useRecoilState(OrgUnitsGroupsConfigState);

    const { data, loading: loadingOrgUnitsGroups, refetch } = useDataQuery<OrgUnitGroupsQueryResponse>(OPTION_GROUPS_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get orgunits groups")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(response) {
            setOrgUnitsGroupsConfigState(response?.results?.organisationUnitGroups);
        },
        lazy: true
    })

    useEffect(() => {
        void refetch()
    }, [])

    return { loadingOrgUnitsGroups, refetch }
}
