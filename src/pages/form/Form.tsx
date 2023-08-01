import React, { useState } from "react";
import { Button, ButtonStrip, CenteredContent, CircularLoader } from "@dhis2/ui";
import { GroupForm, WithPadding } from "../../components";
import { Form } from "react-final-form";
import { useGetAttributes } from "../../hooks/programs/useGetAttributes";

function GenericForm(): React.ReactElement {
    const { data, loading } = useGetAttributes({ programId: "wQaiD2V27Dp" })
    const [values, setvalues] = useState({})

    function onChange(e: any): void {
      setvalues(e)
    }

    if (loading) {
      return (
          <CenteredContent>
              <CircularLoader />
          </CenteredContent>
      )
  }

    console.log(values)
    return (
    <WithPadding>
      <Form onSubmit={() => { alert(JSON.stringify(values)) }} initialValues={{wGiRDfHT0hj: "mozambican"}}>
        {({ values, pristine, form }) => (
          <form onChange={onChange(values)}>
            <GroupForm
              name={"Basic Information"}
              fields={data}
              disabled={false}
            />
            <br />
            <ButtonStrip end>
              <Button disabled={pristine} onClick={form.reset}>Cancel</Button>
              <Button onClick={form.submit} primary disabled={pristine}>
                Submit
              </Button>
            </ButtonStrip>
          </form>
        )}
      </Form>
    </WithPadding>
  );
}
export default GenericForm;
