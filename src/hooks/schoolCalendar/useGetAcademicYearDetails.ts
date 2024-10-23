
import { useDataEngine } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';

const DATASTORE_QUERY = ({
    config: {
        resource: "dataStore/semis/schoolCalendar",
        params: {
            fields: "*"
        }
    }
})

export function useGetSchoolCalendar() {
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine();

    async function getAcademicYearDetails() {
        return await engine.query(DATASTORE_QUERY)
            .then((data: any) => data.config?.academicYear?.startDate)
            .catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            })
    }

    return { getAcademicYearDetails }
}
