import { useSetRecoilState } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect, useState } from "react";
import useShowAlerts from "../commons/useShowAlert";
import { useGetInitialValues } from "../initialValues/useGetInitialValues";
import { ProgramConfig } from "../../types/programConfig/ProgramConfig";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";

const PROGRAMQUERY: any = {
    results: {
        resource: "programs",
        id: ({ id }: { id: string }) => id,
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
}

export function useGetProgramConfig() {
    const { isSetSectionType, sectionType } = useGetInitialValues()
    const setProgramConfigState = useSetRecoilState(ProgramConfigState);
    const { hide, show } = useShowAlerts()
    const { getDataStoreData } = getSelectedKey()
    const program = getDataStoreData.program
    const [customLoading, setcustomLoading] = useState(false)

    useEffect(() => {
        if (isSetSectionType) {
            setcustomLoading(true)
            void refetch({
                id: program
            })
        }
    }, [sectionType, program])

    const { loading, refetch } = useDataQuery<{ results: ProgramConfig }>(PROGRAMQUERY, {
        variables: { id: program },
        onError(error) {
            show({
                message: `${("Could not get program")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            setcustomLoading(false)
        },
        onComplete(response) {
            setProgramConfigState(response?.results);
            setcustomLoading(false)
        },
        lazy: true
    })

    return { loading: loading || customLoading }
}
