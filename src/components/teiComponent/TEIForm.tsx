import React, { useEffect, useState } from "react";
import { Button, ButtonStrip, CenteredContent, CircularLoader } from "@dhis2/ui";
import { GroupForm, WithPadding } from "../../components";
import { Form } from "react-final-form";
import { useGetAttributes } from "../../hooks/programs/useGetAttributes";
import { useGetPatternCode } from "../../hooks/tei/useGetPatternCode";

function TEIGenericForm() {
  const { attributes = [] } = useGetAttributes()
  const [values, setValues] = useState({})
  const { returnPattern, loadingCodes, generatedVariables } = useGetPatternCode()

  useEffect(() => {
    if (attributes.length > 0) {
      void returnPattern(attributes)
    }
  }, [])

  function onChange(e: any): void {
    setValues(e)
  }
  console.log(generatedVariables, loadingCodes, attributes);

  if (loadingCodes) {
    return (
      <CenteredContent>
        <CircularLoader />
      </CenteredContent>
    )
  }

  return (
    <WithPadding>
      <Form
        onSubmit={() => { alert(JSON.stringify(values)) }}
        initialValues={generatedVariables}
      >
        {({ values, pristine, form }) => (
          <form onChange={onChange}>
            <GroupForm
              name={"Attributes"}
              fields={attributes}
              disabled={false}
              description={""}
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
