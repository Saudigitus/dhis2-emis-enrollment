import { useSetRecoilState } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { type ProgramConfig } from "../../types/programConfig/ProgramConfig";

const PROGRAMQUERY = (id: string) => ({
    results: {
        resource: "programs",
        id: `${id}`,
        params: {
            fields: [
                "access",
                "id,displayName,description,programType,version",
                "trackedEntityType[id,trackedEntityTypeAttributes[trackedEntityAttribute[id]]]",
                "programTrackedEntityAttributes[mandatory,displayInList,trackedEntityAttribute[id,displayName,valueType,optionSet]]",
                "programStages[id,displayName,autoGenerateEvent,programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,valueType,optionSet[id]]]]"
            ]
        }
    }
})

export function useGetProgramConfig() {
    const setProgramConfigState = useSetRecoilState(ProgramConfigState);

    const { data, loading } = useDataQuery<{ results: ProgramConfig }>(PROGRAMQUERY("wQaiD2V27Dp"));

    useEffect(() => {
        setProgramConfigState(data?.results);
    }, [loading])

    return {
        data,
        loading
    }
}
