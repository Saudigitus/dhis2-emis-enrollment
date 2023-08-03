import React, { useState } from "react";
import { Button, ButtonStrip, CenteredContent, CircularLoader } from "@dhis2/ui";
import { GroupForm, WithPadding } from "../../components";
import { Form } from "react-final-form";
import { useGetAttributes } from "../../hooks/programs/useGetAttributes";

interface TeiFormProps {
    programId: string
}
function TEIGenericForm(props: TeiFormProps): React.ReactElement {
    const { programId } = props;
    const { attributes, loading } = useGetAttributes({ programId })
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

    console.log(values)
    return (
    <WithPadding>
      <Form onSubmit={() => { alert(JSON.stringify(values)) }}>
        {({ values, pristine, form }) => (
          <form onChange={onChange(values)}>
            <GroupForm
              name={"Attributes"}
              fields={attributes}
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
export default TEIGenericForm;
