import React, { useState } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { Form } from "react-final-form";
import { formFields } from "../../utils/constants/enrollmentForm/enrollmentForm";
import useGetEnrollmentForm from "../../hooks/form/useGetEnrollmentForm";
import GroupForm from "../form/GroupForm";
import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { useParams } from "../../hooks/commons/useQueryParams";
import { teiPostBody } from "../../utils/tei/formatPostBody";
import usePostTei from "../../hooks/tei/usePostTei";
interface ContentProps {
  setOpen: (value: boolean) => void
}

function ModalContentComponent({ setOpen }: ContentProps): React.ReactElement {
  const getProgram = useRecoilValue(ProgramConfigState);
  const { useQuery } = useParams();
  const orgUnit = useQuery().get("school");
  const { enrollmentsData } = useGetEnrollmentForm();
  const [values, setValues] = useState<object>({})
  const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([enrollmentsData])
  const { postTei } = usePostTei()

  function onSubmit() {
    void postTei(teiPostBody(fieldsWitValue, (getProgram != null) ? getProgram.id : "", orgUnit ?? ""), "dev_admin", "Dev2023!")
  }

  const modalActions = [
    { label: "Cancel", disabled: false, loading: false, onClick: () => { setOpen(false) } },
    { label: "Save and add new", primary: true, disabled: false, loading: false, onClick: () => { onSubmit() } },
    { label: "Save and close", primary: true, disabled: false, loading: false, onClick: () => { onSubmit(); setOpen(false) } }
  ];

  if (enrollmentsData.length < 1) {
    return <CircularLoader />
  }

  function onChange(e: any): void {
    const sections = enrollmentsData;
    for (const [key, value] of Object.entries(e)) {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].find((element: any) => element.id === key) !== null && sections[i].find((element: any) => element.id === key) !== undefined) {
          sections[i].find((element: any) => element.id === key).value = value
        }
      }
    }
    setFieldsWitValues(sections)
    setValues(e)
  }

  return (
    <WithPadding>
      <Form onSubmit={() => { alert(JSON.stringify(values)) }}>
        {({ values, pristine, form }) => (
          <form onChange={onChange(values)}>
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
                    {action.loading ? "Loading..." : action.label}
                  </Button>
                ))}
              </ButtonStrip>
            </ModalActions>
          </form>
        )}
      </Form>
    </WithPadding >
  )
}

export default ModalContentComponent;
