import React, { useState, useEffect } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { Form } from "react-final-form";
import { formFields } from "../../utils/constants/enrollmentForm/enrollmentForm";
import useGetEnrollmentForm from "../../hooks/form/useGetEnrollmentForm";
import GroupForm from "../form/GroupForm";
import { useDataMutation } from "@dhis2/app-runtime";
interface ContentProps {
  setOpen: (value: boolean) => void
}

// const POST_TEI = (data: any) => {
//   return {
//     resource: "tracketEntityInstances",
//     type: "create",
//     data
//   }
// }

// const variablesMapping = () => {

// }

function ModalContentComponent({ setOpen }: ContentProps): React.ReactElement {
  const { enrollmentsData } = useGetEnrollmentForm();
  const [values, setValues] = useState<object>({})
  const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([enrollmentsData])
  // const [] = useDataMutation(POST_TEI)

  const onSubmit = () => {
    // console.log(values, enrollmentsData)
  }

  useEffect(() => {
    if (enrollmentsData.length > 0) {
      setFieldsWitValues(enrollmentsData)
    }
  }, [enrollmentsData])

  const modalActions = [
    { label: "Cancel", disabled: false, loading: false, onClick: () => { setOpen(false) } },
    { label: "Save and add new", primary: true, disabled: false, loading: false, onClick: () => { onSubmit() } },
    { label: "Save and close", primary: true, disabled: false, loading: false, onClick: () => { onSubmit(); setOpen(false) } }
  ];

  if (enrollmentsData.length < 1) {
    return <CircularLoader />
  }

  function onChange(e: any): void {
    // const sections = fieldsWitValue;
    // for (const [key, value] of Object.entries(e)) {
    //   for (let i = 0; i < sections.length; i++) {
    //     sections[i].find((element: any) => element.id === key).value = value
    //   }
    // }
    // console.log(sections, "sections");
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
    </WithPadding>
  )
}

export default ModalContentComponent;
