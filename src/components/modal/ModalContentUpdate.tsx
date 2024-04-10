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
import { useParams, useShowAlerts, useUpdateSelectedEnrollment } from "../../hooks";
import { CustomDhis2RulesEngine } from "../../hooks/programRules/rules-engine/RulesEngine";
import { formatKeyValueType } from "../../utils/programRules/formatKeyValueType";
import { TeiRefetch } from "../../schema/refecthTeiSchema";
import { removeFalseKeys } from "../../utils/commons/removeFalseKeys";

function ModalContentUpdate(props: ModalContentUpdateProps): React.ReactElement {
  const { setOpen, sectionName, enrollmentsData, formInitialValues, loadingInitialValues, enrollmentValues } = props;
  const getProgram = useRecoilValue(ProgramConfigState);
  const { useQuery } = useParams();
  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
  const orgUnitName = useQuery().get("schoolName");
  const [, setClicked] = useRecoilState<boolean>(onSubmitClicked);
  const [values, setValues] = useState<Record<string, string>>({})
  const [fieldsWithValue, setFieldsWithValues] = useState<any[]>([enrollmentsData])
  const [clickedButton, setClickedButton] = useState<string>("");
  const [initialValues,] = useState<object>({
    registerschoolstaticform: orgUnitName,
    ...formInitialValues
  })
  const { show } = useShowAlerts()
  const [refetch, setRefetch] = useRecoilState(TeiRefetch)
  const [loading, setLoading] = useState(false)
  const { updateSelectedEnrollment } = useUpdateSelectedEnrollment()
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

    setLoading(true)
    if (allFields.filter((element: any) => (element?.assignedValue === undefined && element.required))?.length === 0) {

      updateSelectedEnrollment(fieldsWithValue, events, initialValues, values, getProgram.id)
        .then(() => {
          setClicked(false)
          setLoading(false)
          setRefetch(!refetch)
          formRef.current.restart()
          show({ message: "Enrollment updated successfully", type: { success: true } })
          setOpen(false)
        })
        .catch(error => {
          setLoading(false)
          show({ message: `Could not update enrollment: ${error.message}`, type: { critical: true } })
          setOpen(false)
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
                    disabled={(action.id == "save" && pristine) || loadingInitialValues || loading}
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
