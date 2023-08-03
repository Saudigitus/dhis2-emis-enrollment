import { useDataQuery } from "@dhis2/app-runtime";
import { formatResponseEvents } from "../../utils/events/formatResponseEvents";

interface GeTDataElementsProps {
    programStageId: string
    type?: keyof typeof fieldsType
}

const fieldsType = {
    programStage: "executionDateLabel,programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]],programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]",
    programStageSection: "executionDateLabel,programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]"
}

const DATA_ELEMENTS_QUERY = (id: string, type: keyof typeof fieldsType) => ({
  result: {
    resource: "programStages",
    id,
    params: {
      fields: fieldsType[type]
    }
  }
});

function useGetDataElements(props: GeTDataElementsProps) {
    const { programStageId, type = "programStage" } = props
    const { data, loading, error } = useDataQuery<{ result: any }>(DATA_ELEMENTS_QUERY(programStageId, type));

  return {
    dataElements: formatResponseEvents(data?.result),
    error,
    loading
  };
}
export { useGetDataElements };
