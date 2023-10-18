import { useSetRecoilState } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { type ProgramConfig } from "../../types/programConfig/ProgramConfig";
import useShowAlerts from "../commons/useShowAlert";

const PROGRAMQUERY = (id: string) => ({
    results: {
        resource: "programs",
        id: `${id}`,
        params: {
            fields: [
                "access",
                "id,displayName,description,programType,version",
                "trackedEntityType[id,trackedEntityTypeAttributes[trackedEntityAttribute[id]]]",
                "programTrackedEntityAttributes[mandatory,displayInList,trackedEntityAttribute[generated,pattern,id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]",
                "programStages[id,displayName,autoGenerateEvent,programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]]"
            ]
        }
    }
})

export function useGetProgramConfig() {
    const setProgramConfigState = useSetRecoilState(ProgramConfigState);
    const { hide, show } = useShowAlerts()

    const { data, loading } = useDataQuery<{ results: ProgramConfig }>(PROGRAMQUERY("LXKwPPht67d"), {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    useEffect(() => {
        setProgramConfigState(data?.results);
    }, [loading])

    return {
        data,
        loading
    }
}
