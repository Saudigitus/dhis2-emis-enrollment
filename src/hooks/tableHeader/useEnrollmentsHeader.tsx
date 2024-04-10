import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponseEvents } from "../../utils/events/formatResponseEvents";
import { ProgramStageConfig } from "../../types/programStageConfig/ProgramStageConfig";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { Attribute } from "../../types/generated/models";
import { CustomAttributeProps, VariablesTypes } from "../../types/variables/AttributeColumns";

export function useEnrollmentsHeader() {
    const { registration } = getDataStoreKeys()
    const programConfigState = useRecoilValue(ProgramConfigState);
    const enrollmentDetailProgramStage = programConfigState.programStages.find((element: ProgramStageConfig) => element.id === registration.programStage) as unknown as ProgramStageConfig

    const staticHeaders: CustomAttributeProps[] = [{
        id: "orgUnitName",
        displayName: "orgUnitName",
        header: "School",
        required: false,
        name: "orgUnitName",
        labelName: "School",
        valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        options: undefined as unknown as CustomAttributeProps["options"],
        visible: true,
        disabled: false,
        pattern: '',
        searchable: false,
        error: false,
        content: '',
        key: '',
        type: VariablesTypes.Attribute
    }]
    return {
        columns: staticHeaders.concat(formatResponseEvents(enrollmentDetailProgramStage) ?? []),
    }
}
