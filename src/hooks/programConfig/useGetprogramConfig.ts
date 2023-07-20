import { atom, useSetRecoilState } from "recoil";
import { type ProgramSchemaConfig } from "../../schema/programSchema";
import { useAlert } from "@dhis2/app-runtime";

const PROGRAMQUERY = {
    results: {
        resource: "programs",
        id: ({ id }: { id: string }) => id,
        params: {
            fields: [
                ["access"],
                ["id,displayName,description,programType,version"],
                ["programStages[id,displayName,autoGenerateEvent]"],
                ["trackedEntityType[id,trackedEntityTypeAttributes[trackedEntityAttribute[displayName,id]]]"],
                ["programTrackedEntityAttributes[trackedEntityAttribute[id,displayName,mandatory,displayInList,trackedEntityAttributeValues[displayName,id]]]"]
            ]
        }
    }
}

export const ProgramConfigGetState = atom<ProgramSchemaConfig | null>({
    key: "programConfig-get-state",
    default: null
})

export function useGetProgramConfig() {
    const programConfig = useSetRecoilState(ProgramConfigGetState);
    const { show, hide } = useAlert(({ message }: { message: string }) => message, ({ type }: {
        type: Record<string, any>
    }) => ({
        ...type,
        duration: 3000
    }))

    return {

    }
}
