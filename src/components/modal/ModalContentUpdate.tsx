import React, { useState, useEffect, useRef } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { Form } from "react-final-form";
import { formFields } from "../../utils/constants/enrollmentForm/enrollmentForm";
import GroupForm from "../form/GroupForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { onSubmitClicked } from "../../schema/formOnSubmitClicked";
import {ModalContentUpdateProps } from "../../types/modal/ModalProps";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { useParams, useUpdateEnrollmentData } from "../../hooks";
import { CustomDhis2RulesEngine } from "../../hooks/programRules/rules-engine/RulesEngine";
import { teiUpdateBody } from "../../utils/tei/formatUpdateBody";
import { eventUpdateBody } from "../../utils/events/formatPostBody";
import { formatKeyValueType } from "../../utils/programRules/formatKeyValueType";

function ModalContentUpdate(props: ModalContentUpdateProps): React.ReactElement {
  const { setOpen, sectionName,  enrollmentsData, formInitialValues, loadingInitialValues, enrollmentValues } = props;
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
  const [initialValues, setInitialValues] = useState<object>({
    registerschoolstaticform: orgUnitName,
    ...formInitialValues
  })
  const { updateEnrollmentData, data,  loading } =  useUpdateEnrollmentData()
  const {runRulesEngine, updatedVariables } = CustomDhis2RulesEngine({ variables: formFields(enrollmentsData, sectionName), values, type:"programStageSection", formatKeyValueType: formatKeyValueType(enrollmentsData) })
 
  useEffect(() => {
    runRulesEngine()
  }, [values])

  useEffect(() => { 
    setClicked(false) 
  }, [])

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
      void updateEnrollmentData({
        dataEnrollmentData: teiUpdateBody(
          fieldsWithValue,
          orgUnit ?? "",
          trackedEntityType, 
          initialValues['trackedEntity' as unknown as keyof typeof initialValues] as unknown as string,
          values
        ), 

        dataEvents: eventUpdateBody(
          fieldsWithValue,
          enrollmentValues['events'],
          formInitialValues['enrollmentDate'],
          values
        )})
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
  const sections = enrollmentsData;
  function onChange(e: any): void {
    for (const [key, value] of Object.entries(e)) {
      for (let i = 0; i < sections?.length; i++) {
        if (sections[i].find((element: any) => element.id === key) !== null && sections[i].find((element: any) => element.id === key) !== undefined) {
          if(sections[i].find((element: any) => element.id === key).valueType === "BOOLEAN"){
            sections[i].find((element: any) => element.id === key).value = value
          }
          if(sections[i].find((element: any) => element.id === key).valueType === "TRUE_ONLY" && !sections[i].find((element: any) => element.id === key).assignedValue){
            sections[i].find((element: any) => element.id === key).assignedValue = ''
          }
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
        {({ handleSubmit, values, form,  pristine  }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={onChange(values) as unknown as ()=> void}
          >
            {
              updatedVariables?.filter(x => x.visible)?.map((field: any, index: number) => (
                <GroupForm
                  name={field?.section}
                  description={field?.description}
                  key={index}
                  fields={field?.fields}
                  disabled={false}
                  trackedEntity={initialValues['trackedEntity' as unknown as keyof typeof initialValues] as unknown as string}
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
