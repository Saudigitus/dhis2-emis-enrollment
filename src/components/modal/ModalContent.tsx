import React, { useState, useEffect, useRef } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { Form } from "react-final-form";
import { formFields } from "../../utils/constants/enrollmentForm/enrollmentForm";
import useGetEnrollmentForm from "../../hooks/form/useGetEnrollmentForm";
import GroupForm from "../form/GroupForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { useParams } from "../../hooks/commons/useQueryParams";
import usePostTei from "../../hooks/tei/usePostTei";
import { format } from "date-fns";
import { useGetPatternCode } from "../../hooks/tei/useGetPatternCode";
import { useGetAttributes } from "../../hooks/programs/useGetAttributes";
import { teiPostBody } from "../../utils/tei/formatPostBody";
import { onSubmitClicked } from "../../schema/formOnSubmitClicked";
interface ContentProps {
  setOpen: (value: boolean) => void
}

function ModalContentComponent({ setOpen }: ContentProps): React.ReactElement {
  const getProgram = useRecoilValue(ProgramConfigState);
  const { useQuery } = useParams();
  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
  const orgUnit = useQuery().get("school");
  const orgUnitName = useQuery().get("schoolName");
  const { enrollmentsData } = useGetEnrollmentForm();
  const [, setClicked] = useRecoilState<boolean>(onSubmitClicked);
  const [values, setValues] = useState<object>({})
  const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([enrollmentsData])
  const { postTei, loading, data } = usePostTei()
  const [clickedButton, setClickedButton] = useState<string>("");
  const [initialValues] = useState<object>({
    registerschoolstaticform: orgUnitName,
    eventdatestaticform: format(new Date(), "yyyy-MM-dd")
  })
  const { attributes = [] } = useGetAttributes()
  const { returnPattern, loadingCodes, generatedVariables } = useGetPatternCode()

  useEffect(() => {
    void returnPattern(attributes)
  }, [data])

  useEffect(() => { setClicked(false) }, [])

  // When Save and continue button clicked and data posted, close the modal
  useEffect(() => {
    if (data !== undefined && data?.status === "OK") {
      if (clickedButton === "saveandcontinue") {
        setOpen(false)
      }
      setClicked(false)
      formRef.current.restart()
    }
  }, [data])

  function onSubmit() {
    const allFields = fieldsWitValue.flat()
    if (allFields.filter((element: any) => (element?.value === undefined && element.required)).length === 0) {
      void postTei({ data: teiPostBody(fieldsWitValue, (getProgram != null) ? getProgram.id : "", orgUnit ?? "", values?.eventdatestaticform ?? "") })
    }
  }

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setClickedButton("cancel"); setOpen(false) } },
    { id: "saveandnew", type: "submit", label: "Save and add new", primary: true, disabled: loading, onClick: () => { setClickedButton("saveandnew"); setClicked(true) } },
    { id: "saveandcontinue", type: "submit", label: "Save and close", primary: true, disabled: loading, onClick: () => { setClickedButton("saveandcontinue"); setClicked(true) } }
  ];

  if (enrollmentsData.length < 1 || loadingCodes) {
    return (
      <CenteredContent>
        <CircularLoader />
      </CenteredContent>
    )
  }

  function onChange(e: any): void {
    const sections = enrollmentsData;
    for (const [key, value] of Object.entries(e)) {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].find((element: any) => element.id === key) !== null && sections[i].find((element: any) => element.id === key) !== undefined) {
          // Sending onChanging form value to variables object
          sections[i].find((element: any) => element.id === key).value = value
        }
      }
    }
    setFieldsWitValues(sections)
    setValues(e)
  }

  return (
    <WithPadding>
      <Form initialValues={{ ...initialValues, ...generatedVariables }} onSubmit={onSubmit}>
        {({ handleSubmit, values, pristine, form }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={onChange(values)}
          >
            {
              formFields(enrollmentsData).map((field: any, index: number) => (
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

export default ModalContentComponent;
