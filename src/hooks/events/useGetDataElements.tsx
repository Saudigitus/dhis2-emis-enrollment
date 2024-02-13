import { useDataQuery } from "@dhis2/app-runtime";
import { formatResponseEvents } from "../../utils/events/formatResponseEvents";
import { GeTDataElementsProps, fieldsType } from "../../types/api/WithoutRegistrationProps";

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
