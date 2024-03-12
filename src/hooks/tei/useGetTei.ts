import { useDataEngine } from "@dhis2/app-runtime";
import useShowAlerts from '../commons/useShowAlert';
import { TeiQueryProps, TeiQueryResults } from "../../types/api/WithRegistrationProps";


const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,orgUnit,program, events],",
            ...queryProps
        }
    }
})

export function useGetTei() {
    const engine = useDataEngine();
    const { hide, show } = useShowAlerts()

    async function getTei(program: string, orgUnit: string, trackedEntity: string) {
        return await engine.query(TEI_QUERY({
            pageSize:10,
            program: program,
            orgUnit: orgUnit,
            trackedEntity: trackedEntity
        })).catch((error) => {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }) as unknown as TeiQueryResults

    }

    return { getTei }
}