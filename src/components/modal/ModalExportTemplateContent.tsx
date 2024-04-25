import React, { useState, useRef } from "react";
import { ModalActions, Button, ButtonStrip, Tag, IconInfo16 } from "@dhis2/ui";
import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalExportTemplateProps } from "../../types/modal/ModalProps";
import { useParams } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import useGetExportTemplateForm from "../../hooks/form/useGetExportTemplateForm";
import { formFields } from "../../utils/constants/exportTemplateForm/exportEmptyTemplateForm";
import { removeFalseKeys } from "../../utils/commons/removeFalseKeys";
import useExportTemplate from "../../hooks/exportTemplate/useExportTemplate";

const loading = false;
function ModalExportTemplateContent(props: ModalExportTemplateProps): React.ReactElement {
  const { setOpen, sectionName } = props;
  const { exportFormFields } = useGetExportTemplateForm();
  const { registration } = getDataStoreKeys()

  const { urlParamiters } = useParams();
  const { school: orgUnit, schoolName: orgUnitName, academicYear } = urlParamiters();

  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);

  const [values, setValues] = useState<Record<string, string>>({})
  const [initialValues] = useState<object>({
    orgUnitName,
    [registration?.academicYear]: academicYear
  })
  const [loadingExport , setLoadingExport] = useState(false)

  const { handleExportToWord } = useExportTemplate()

 async function onSubmit() {
    await handleExportToWord({academicYearId: values[registration.academicYear], orgUnit: values.orgUnit , orgUnitName: values.orgUnitName , studentsNumber : values.studentsNumber , setLoadingExport})
        // window.open(`${baseUrl}/api/documents/${documentId?.id}/data`, "_blank");
        setOpen(false)
  }
 

  function onChange(e: any): void {
    //object with form fields data
    setValues(removeFalseKeys(e))
  }

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setOpen(false) } },
    { id: "downloadTemplate", type: "submit", label: "Download template", primary: true, disabled: loadingExport, loading: loadingExport }
  ];

  return (
    <div>
      <Tag positive icon={<IconInfo16 />} maxWidth="100%">
        This file will allow the import of new {sectionName} data into the system. Please respect the blocked fields to avoid conflicts.
      </Tag>

      <Form initialValues={{ ...initialValues, orgUnit }} onSubmit={onSubmit}>
        {({ handleSubmit, values, form }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={onChange(values) as unknown as () => void}
          >
            {
              formFields(exportFormFields, sectionName)?.map((field: any, index: number) => {
                return (
                  <GroupForm
                    name={field.section}
                    description={field.description}
                    key={index}
                    fields={field.fields}
                    disabled={false}
                  />
                )
              })
            }
            <br />
            <ModalActions>
              <ButtonStrip end>
                {modalActions.map((action, i) => {
                  return (
                    <Button key={i} {...action} >
                      {action.label}
                    </Button>
                  )
                })}
              </ButtonStrip>
            </ModalActions>
          </form>
        }}
      </Form>
    </div >
  )
}

export default ModalExportTemplateContent;
