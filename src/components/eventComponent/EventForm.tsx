import React, { useState } from "react";
import { Button, ButtonStrip, CenteredContent, CircularLoader } from "@dhis2/ui";
import { GroupForm, WithPadding } from "../../components";
import { Form } from "react-final-form";
import { useGetDataElements } from "../../hooks";
import { EventFormProps } from "../../types/form/EventFormProps";

function EventGenericForm(props: EventFormProps): React.ReactElement {
  const { programStageId } = props;
  const { dataElements, loading } = useGetDataElements({ programStageId })
  const [values, setValues] = useState({})

  function onChange(e: any): void {
    setValues(e)
  }

  if (loading) {
    return (
      <CenteredContent>
        <CircularLoader />
      </CenteredContent>
    )
  }

  return (
    <WithPadding>
      <Form onSubmit={() => { alert(JSON.stringify(values)) }}>
        {({ values, pristine, form }) => (
          <form onChange={() => { onChange(values) }}>
            <GroupForm
              name={"Data Elements"}
              fields={dataElements}
              disabled={false}
              description=""
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
export default EventGenericForm;
