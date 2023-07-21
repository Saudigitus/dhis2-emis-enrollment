import { useSetRecoilState } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { type ProgramConfig } from "../../types/programConfig/ProgramConfig";

const PROGRAMQUERY = {
    results: {
        resource: "programs",
        id: "wQaiD2V27Dp",
        // id: ({ id }: { id: string }) => id,
        params: {
            fields: [
                "access",
                "id,displayName,description,programType,version",
                "programStages[id,displayName,autoGenerateEvent]",
                "trackedEntityType[id,trackedEntityTypeAttributes[trackedEntityAttribute[id]]]",
                "programTrackedEntityAttributes[mandatory,displayInList,trackedEntityAttribute[id,displayName,valueType,optionSet]]"
            ]
        }
    }
}

export function useGetProgramConfig() {
    const setProgramConfigState = useSetRecoilState(ProgramConfigState);

    const { data, loading } = useDataQuery<{ results: ProgramConfig }>(PROGRAMQUERY);

    useEffect(() => {
        setProgramConfigState(data?.results);
    }, [loading])

    return {
        data,
        loading
    }
}
