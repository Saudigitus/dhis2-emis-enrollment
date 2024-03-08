import React, { useState, useEffect, useRef } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { Form } from "react-final-form";
import { formFields } from "../../utils/constants/enrollmentForm/enrollmentForm";
import GroupForm from "../form/GroupForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { format } from "date-fns";
import { teiPostBody } from "../../utils/tei/formatPostBody";
import { onSubmitClicked } from "../../schema/formOnSubmitClicked";
import { ModalUpdateStudentProps } from "../../types/modal/ModalProps";
import { useGetAttributes, useGetPatternCode, useGetUsedPProgramStages, useParams, usePostTei } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { Dhis2RulesEngine } from "../../hooks/programRules/rules-engine/RulesEngine";
import { teiUpdateBody } from "../../utils/tei/formatUpdateBody";

function ModalUpdate(props: ModalUpdateStudentProps): React.ReactElement {
  const { setOpen,  sectionName, studentInitialValues, enrollmentsData } = props;
  const getProgram = useRecoilValue(ProgramConfigState);
  const { useQuery } = useParams();
  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
  const orgUnit = useQuery().get("school");
  const orgUnitName = useQuery().get("schoolName");
  const performanceProgramStages = useGetUsedPProgramStages();
  const [, setClicked] = useRecoilState<boolean>(onSubmitClicked);
  const [values, setValues] = useState<Record<string, string>>({})
  const { trackedEntityType } = getDataStoreKeys();
  const [fieldsWithValue, setFieldsWithValues] = useState<any[]>([enrollmentsData])
  const { postTei, loading, data } = usePostTei()
  const [clickedButton, setClickedButton] = useState<string>("");
  const [initialValues] = useState<object>({
    registerschoolstaticform: orgUnitName,
    eventdatestaticform:'',
    ...studentInitialValues
  })
  const { attributes = [] } = useGetAttributes()
  const { returnPattern, loadingCodes, generatedVariables } = useGetPatternCode()
  const {runRulesEngine, updatedVariables } = Dhis2RulesEngine({ variables: formFields(enrollmentsData, sectionName), values, type:"programStageSection" })
 
  useEffect(() => {
    runRulesEngine()
  }, [values])

  useEffect(() => {
    void returnPattern(attributes)
  }, [data])

  useEffect(() => { setClicked(false) }, [])

  // When Save and continue button clicked and data posted, close the modal
  useEffect(() => {
    if (data && data["status" as unknown as keyof typeof data] === "OK") {
      setOpen(false)
      setClicked(false)
      formRef.current.restart()
    }
  }, [data])

  function onSubmit() {
    const allFields = fieldsWithValue.flat()
    if (allFields.filter((element: any) => (element?.assignedValue === undefined && element.required))?.length === 0) {
      void postTei({
        data: teiUpdateBody(fieldsWithValue,
          (getProgram != null) ? getProgram.id : "", orgUnit ?? "",
          values?.eventdatestaticform ?? "",
          performanceProgramStages, trackedEntityType, initialValues['trackedEntity' as unknown as keyof typeof initialValues] as unknown as string)
      })
    }
  }

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setClickedButton("cancel"); setOpen(false) } },
    { id: "save", type: "submit", label: "Update", primary: true, disabled: loading, onClick: () => { setClickedButton("save"); setClicked(true) } },
  ];

  if (enrollmentsData?.length < 1 || loadingCodes) {
    return (
      <CenteredContent>
        <CircularLoader />
      </CenteredContent>
    )
  }

  function onChange(e: any): void {
    const sections = enrollmentsData;
    for (const [key, value] of Object.entries(e)) {
      for (let i = 0; i < sections?.length; i++) {
        if (sections[i].find((element: any) => element.id === key) !== null && sections[i].find((element: any) => element.id === key) !== undefined) {
          sections[i].find((element: any) => element.id === key).assignedValue = value
        }
      }
    }
    setFieldsWithValues(sections)
    setValues(e)
  }

  return (
    <WithPadding>
      <Form initialValues={{ ...initialValues }} onSubmit={onSubmit}>
        {({ handleSubmit, values, form }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={onChange(values)}
          >
            {
              formFields(enrollmentsData, sectionName).map((field: any, index: number) => (
                <GroupForm
                  name={field.section}
                  description={field.description}
                  key={index}
                  fields={field.fields}
                  disabled={false}
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

export default ModalUpdate;
