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
import { ModalContentProps } from "../../types/modal/ModalProps";
import { useGetAttributes, useGetEnrollmentForm, useGetPatternCode, useGetUsedPProgramStages, useParams, usePostTei } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { CustomDhis2RulesEngine } from "../../hooks/programRules/rules-engine/RulesEngine";
import { formatKeyValueType } from "../../utils/programRules/formatKeyValueType";
import useBulkUpdate from "../../hooks/bulkStudent/bulkUpdateStudents";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";

function ModalContentComponent(props: ModalContentProps): React.ReactElement {
  const { setOpen, enrollmentsData, sectionName, bulkUpdate = false } = props;
  const getProgram = useRecoilValue(ProgramConfigState);
  const { urlParamiters } = useParams();
  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
  const { school: orgUnit, schoolName: orgUnitName, grade, academicYear } = urlParamiters()
  const performanceProgramStages = useGetUsedPProgramStages();
  const [, setClicked] = useRecoilState<boolean>(onSubmitClicked);
  const [values, setValues] = useState<Record<string, string>>({})
  const { trackedEntityType } = getDataStoreKeys();
  const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([enrollmentsData])
  const { postTei, loading, data } = usePostTei()
  const [clickedButton, setClickedButton] = useState<string>("");
  const [initialValues] = useState<object>({
    registerschoolstaticform: orgUnitName,
    eventdatestaticform: format(new Date(), "yyyy-MM-dd")
  })
  const { updateClass, loading: loadingBulkUpdate } = useBulkUpdate({ setOpen })
  const { attributes = [] } = useGetAttributes()
  const { returnPattern, loadingCodes, generatedVariables } = useGetPatternCode()
  const { runRulesEngine, updatedVariables } = CustomDhis2RulesEngine({ variables: formFields(enrollmentsData, sectionName), values, type: "programStageSection", formatKeyValueType: formatKeyValueType(enrollmentsData) })
  const { getDataStoreData } = getSelectedKey();

  useEffect(() => {
    runRulesEngine()
  }, [values])

  useEffect(() => {
    if (!bulkUpdate)
      void returnPattern(attributes)
  }, [data])

  useEffect(() => { setClicked(false) }, [])

  // When Save and continue button clicked and data posted, close the modal
  useEffect(() => {
    if (data && data["status" as unknown as keyof typeof data] === "OK") {
      if (clickedButton === "saveandcontinue") {
        setOpen(false)
      }
      setClicked(false)
      formRef.current.restart()
    }
  }, [data])

  function onSubmit() {
    if (bulkUpdate) {
      updateClass(values)
    } else {
      const allFields = fieldsWitValue.flat()
      if (allFields.filter((element: any) => (element?.assignedValue === undefined && element.required))?.length === 0) {
        void postTei({
          data: teiPostBody(fieldsWitValue,
            (getProgram != null) ? getProgram.id : "", orgUnit ?? "",
            values?.eventdatestaticform ?? "",
            performanceProgramStages, trackedEntityType)
        })
      }
    }
  }

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setClickedButton("cancel"); setOpen(false) } },
    { id: "saveandnew", type: "submit", label: "Save and add new", primary: true, disabled: loading, onClick: () => { setClickedButton("saveandnew"); setClicked(true) } },
    { id: "saveandcontinue", type: "submit", label: "Save and close", primary: true, disabled: loading, onClick: () => { setClickedButton("saveandcontinue"); setClicked(true) } }
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
          // Sending onChanging form value to variables object
          sections[i].find((element: any) => element.id === key).assignedValue = value
        }
      }
    }
    setFieldsWitValues(sections)
    setValues(e)
  }

  return (
    <WithPadding>
      <Form initialValues={{
        ...initialValues,
        ...(bulkUpdate ? {
          [getDataStoreData?.registration.grade]: grade,
          [getDataStoreData?.registration.academicYear]: academicYear
        } : generatedVariables)
      }}
        onSubmit={onSubmit}>
        {({ handleSubmit, values, form }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={onChange(values) as unknown as () => void}
          >
            {
              updatedVariables?.filter(x =>
                bulkUpdate ? x.section == 'Enrollment Details' : x.visible
              )?.map((field: any, index: number) => {
                return (
                  <GroupForm
                    name={field.section}
                    description={field.description}
                    key={index}
                    fields={field.fields}
                    disabled={false}
                    bulkUpdate={bulkUpdate}
                  />
                )
              })
            }
            <br />
            <ModalActions>
              <ButtonStrip end className="mr-4">
                {modalActions.map((action, i) => {
                  return (
                    <>
                      {
                        !(bulkUpdate && action.id === 'saveandnew') &&
                        <Button
                          key={i}
                          {...action}
                        >
                          {(!!(loading || loadingBulkUpdate) && action.id === clickedButton) ? <CircularLoader small /> : action.label}
                        </Button>
                      }
                    </>
                  )
                })}
              </ButtonStrip>
            </ModalActions>
          </form>
        }}
      </Form>
    </WithPadding >
  )
}

export default ModalContentComponent;
