import { useSetRecoilState } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { type ProgramConfig } from "../../types/programConfig/ProgramConfig";
import useShowAlerts from "../commons/useShowAlert";
import { useGetInitialValues } from "../initialValues/useGetInitialValues";

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

export function useGetProgramConfig(program: string) {
    const { isSetSectionType } = useGetInitialValues()
    const setProgramConfigState = useSetRecoilState(ProgramConfigState);
    const { hide, show } = useShowAlerts()

    const { loading, refetch } = useDataQuery<{ results: ProgramConfig }>(PROGRAMQUERY(program), {
        onError(error) {
            show({
                message: `${("Could not get program")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(response) {
            setProgramConfigState(response?.results);
        },
        lazy: true
    })

    useEffect(() => {
        if (isSetSectionType && (program !== undefined || program !== null)) {
            void refetch()
        }
    }, [isSetSectionType])

    return { loading }
}
