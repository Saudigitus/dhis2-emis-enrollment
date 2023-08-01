import React, { useState } from "react";
import { Button, ButtonStrip } from "@dhis2/ui";
import { GroupForm, WithPadding } from "../../components";
import { Form } from "react-final-form";
import { fieldsData } from "./auxFields";

function GenericForm(): React.ReactElement {
    const [values, setvalues] = useState({})

    function onChange(e: any): void {
      setvalues(e)
    }

    console.log(values)
    return (
    <WithPadding>
      <Form onSubmit={() => { alert(JSON.stringify(values)) }} initialValues={{ birthdate: '2023-01-01' }}>
        {({ values, pristine, form }) => (
          <form onChange={onChange(values)}>
            <GroupForm
              name={"Basic Information"}
              fields={fieldsData}
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
