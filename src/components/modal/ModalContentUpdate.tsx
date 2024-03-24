import React, { useState, useEffect, useRef } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { Form } from "react-final-form";
import { formFields } from "../../utils/constants/enrollmentForm/enrollmentForm";
import GroupForm from "../form/GroupForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { onSubmitClicked } from "../../schema/formOnSubmitClicked";
import { ModalContentUpdateProps } from "../../types/modal/ModalProps";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { useParams, useShowAlerts } from "../../hooks";
import { CustomDhis2RulesEngine } from "../../hooks/programRules/rules-engine/RulesEngine";
import { teiUpdateBody } from "../../utils/tei/formatUpdateBody";
import { eventUpdateBody } from "../../utils/events/formatPostBody";
import { formatKeyValueType } from "../../utils/programRules/formatKeyValueType";
import useUpdateTei from "../../hooks/tei/useUpdateTei";
import { usePostEvent } from "../../hooks/events/useCreateEvents";
import { TeiRefetch } from "../../schema/refecthTeiSchema";
import { removeFalseKeys } from "../../utils/commons/removeFalseKeys";

function ModalContentUpdate(props: ModalContentUpdateProps): React.ReactElement {
  const { setOpen, sectionName, enrollmentsData, formInitialValues, loadingInitialValues, enrollmentValues } = props;
  const getProgram = useRecoilValue(ProgramConfigState);
  const { useQuery } = useParams();
  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
  const orgUnit = useQuery().get("school");
  const orgUnitName = useQuery().get("schoolName");
  const [, setClicked] = useRecoilState<boolean>(onSubmitClicked);
  const [values, setValues] = useState<Record<string, string>>({})
  const { trackedEntityType } = getDataStoreKeys();
  const [fieldsWithValue, setFieldsWithValues] = useState<any[]>([enrollmentsData])
  const [clickedButton, setClickedButton] = useState<string>("");
  const [initialValues] = useState<object>({
    registerschoolstaticform: orgUnitName,
    ...formInitialValues
  })
  const { show } = useShowAlerts()
  const [refetch, setRefetch] = useRecoilState(TeiRefetch)
  const [loading, setLoading] = useState(false)
  const { updateTei } = useUpdateTei()
  const { updateEvent } = usePostEvent()
  const { runRulesEngine, updatedVariables } = CustomDhis2RulesEngine({ variables: formFields(enrollmentsData, sectionName), values, type: "programStageSection", formatKeyValueType: formatKeyValueType(enrollmentsData) })

  useEffect(() => {
    runRulesEngine()
  }, [values])

  useEffect(() => {
    setClicked(false)
  }, [])

  function onSubmit() {
    const allFields = fieldsWithValue.flat()
    const events = enrollmentValues['events']
    const eventDate = formInitialValues['eventdatestaticform']
    const trackedEntity = initialValues['trackedEntity' as unknown as keyof typeof initialValues]

    setLoading(true)
    if (allFields.filter((element: any) => (element?.assignedValue === undefined && element.required))?.length === 0) {
      const promises = [];

      for (let index = 0; index < fieldsWithValue.length; index++) {
        const element = fieldsWithValue[index];

        if (element.some((field: any) => field.assignedValue != initialValues[field.id as keyof typeof initialValues])) {
          if (element[0].type === "dataElement") {
            promises.push(
              updateEvent({
                data: eventUpdateBody(
                  [fieldsWithValue[index]],
                  events?.filter((event: any) => event.programStage === element[0].programStage),
                  eventDate,
                  values,
                  orgUnit ?? "",
                  (getProgram != null) ? getProgram.id : "",
                  trackedEntity
                )
              }).catch(() => {
                show({ message: "Error", type: { error: true } })
                setLoading(false)
              })
            );
          } else if (element[0].type === "attribute") {
            promises.push(
              updateTei({
                data: teiUpdateBody(
                  [fieldsWithValue[index]],
                  orgUnit ?? "",
                  trackedEntityType,
                  trackedEntity,
                  values
                )
              }).catch(() => {
                show({ message: "Error", type: { error: true } })
                setLoading(false)
              })
            );
          }
        }
      }

      Promise.all(promises)
        .then(() => {
          setOpen(false)
          setClicked(false)
          setLoading(false)
          setRefetch(!refetch)
          formRef.current.restart()
          show({ message: "Enrollment updated successfully", type: { success: true } })
        })
        .catch(error => {
          setLoading(false)
          show({ message: `Error: ${error}`, type: { error: true } })
        });
    }
  }

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setClickedButton("cancel"); setOpen(false) } },
    { id: "save", type: "submit", label: "Update", primary: true, disabled: loading, onClick: () => { setClickedButton("save"); setClicked(true) } },
  ];

  if (enrollmentsData?.length < 1 || loadingInitialValues || !Object.keys(formInitialValues).length) {
    return (
      <CenteredContent>
        <CircularLoader />
      </CenteredContent>
    )
  }
  function onChange(e: any): void {
    const sections = enrollmentsData;
    for (let i = 0; i < sections?.length; i++) {
      const section = sections[i]

      for (let j = 0; j < section?.length; j++) {
        if (section[j].valueType === "TRUE_ONLY" && !section[j].assignedValue)
          section[j].assignedValue = ''

        if (section[j].valueType === "BOOLEAN")
          section[j].value = e[section[j].id]

        section[j].assignedValue = e[section[j].id]
      }
    }

    setFieldsWithValues(sections)
    setValues(removeFalseKeys(e))
  }

  return (
    <WithPadding>
      <Form initialValues={{ ...initialValues }} onSubmit={onSubmit}>
        {({ handleSubmit, values, form, pristine }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={onChange(values) as unknown as () => void}
          >
            {
              updatedVariables?.filter(x => x.visible)?.map((field: any, index: number) => (
                <GroupForm
                  name={field?.section}
                  description={field?.description}
                  key={index}
                  fields={field?.fields}
                  disabled={false}
                  trackedEntity={initialValues['trackedEntity' as unknown as keyof typeof initialValues]}
                />
              ))
            }
            <br />
            <ModalActions>
              <ButtonStrip end className="mr-4">
                {modalActions.map((action, i) => (
                  <Button
                    key={i}
                    {...action}
                    disabled={pristine || loadingInitialValues || loading}
                  >
                    {(loading && action.id === clickedButton) ? <CircularLoader small /> : action.label}
                  </Button>
                ))}
              </ButtonStrip>
            </ModalActions>
          </form>
        }}
      </Form>
    </WithPadding >
  )
}

export default ModalContentUpdate;
