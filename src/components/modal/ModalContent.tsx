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
import { useGetAttributes, useGetPatternCode, useGetUsedPProgramStages, useParams, usePostTei } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { CustomDhis2RulesEngine } from "../../hooks/programRules/rules-engine/RulesEngine";
import { formatKeyValueType } from "../../utils/programRules/formatKeyValueType";
import useBulkUpdate from "../../hooks/bulkStudent/bulkUpdateStudents";
import { SearchInitialValues } from "../../schema/searchInitialValues";
import { removeFalseKeys } from "../../utils/commons/removeFalseKeys";
import { formatDateToIsoString } from "../../utils/commons/formatDateToIsoString";
import styles from "./modal.module.css";
import classNames from "classnames";

function ModalContentComponent(props: ModalContentProps): React.ReactElement {
  const { setOpen, enrollmentsData, sectionName, bulkUpdate = false } = props;
  const getProgram = useRecoilValue(ProgramConfigState);
  const { useQuery } = useParams();
  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
  const orgUnit = useQuery().get("school");
  const orgUnitName = useQuery().get("schoolName");
  const performanceProgramStages = useGetUsedPProgramStages();
  const [, setClicked] = useRecoilState<boolean>(onSubmitClicked);
  const [values, setValues] = useState<Record<string, string>>({})
  const { trackedEntityType } = getDataStoreKeys();
  const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([enrollmentsData])
  const { postTei, loading, data } = usePostTei()
  const [clickedButton, setClickedButton] = useState<string>("");
  const [searchInitialValues, setSearchInitialValues] = useRecoilState(SearchInitialValues)

  const [initialValues] = useState<object>({
    registerschoolstaticform: orgUnitName,
    enrollment_date: format(new Date(), "yyyy-MM-dd"),
    ...searchInitialValues
  })
  const { updateClass, loading: loadingBulkUpdate } = useBulkUpdate()
  const { attributes = [] } = useGetAttributes()
  const { returnPattern, loadingCodes, generatedVariables } = useGetPatternCode()
  const { runRulesEngine, updatedVariables } = CustomDhis2RulesEngine({ variables: formFields(enrollmentsData, sectionName), values, type: "programStageSection", formatKeyValueType: formatKeyValueType(enrollmentsData) })

  useEffect(() => {
    runRulesEngine()
  }, [values])

  useEffect(() => {
    if (!initialValues['trackedEntity' as unknown as keyof typeof initialValues])
      void returnPattern(attributes)
  }, [data])

  useEffect(() => { setClicked(false) }, [])

  // When Save and continue button clicked and data posted, close the modal
  useEffect(() => {
    if (data && data["status" as unknown as keyof typeof data] === "OK") {
      if (clickedButton === "saveandcontinue") {
        setOpen(false)
        setSearchInitialValues({})
      }
      setClicked(false)
      setSearchInitialValues({})
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
            formatDateToIsoString(values?.enrollment_date) ?? "",
            performanceProgramStages, trackedEntityType, initialValues['trackedEntity' as unknown as keyof typeof initialValues])
        })
      }
    }
  }

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setClickedButton("cancel"); setOpen(false); setSearchInitialValues({}) } },
    { id: "saveandnew", type: "submit", label: "Save and add new", primary: true, disabled: loading, onClick: () => { setClickedButton("saveandnew"); setClicked(true) } },
    { id: "saveandcontinue", type: "submit", label: "Save and close", primary: true, disabled: loading, onClick: () => { setClickedButton("saveandcontinue"); setClicked(true) } }
  ];

  if (enrollmentsData?.length < 1 || loadingCodes) {
    return (
      <CenteredContent className="p-5">
        <CircularLoader />
      </CenteredContent>
    )
  }

  function onChange(e: any): void {
    const sections = enrollmentsData;
    for (let i = 0; i < sections?.length; i++) {
      const section = sections[i]

      for (let j = 0; j < section?.length; j++) {
        if (section[j].valueType === "TRUE_ONLY" && !section[j].assignedValue)
          section[j].assignedValue = ''

        if (section[j].valueType === "BOOLEAN")
          section[j].value = e[section[j].id]

        section[j].assignedValue = e[section[j].id]
      }
    }

    setFieldsWitValues(sections)
    setValues(removeFalseKeys(e))
  }



  return (
    <WithPadding>
      <Form initialValues={{ ...generatedVariables, ...initialValues, orgUnit }} onSubmit={onSubmit}>
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
                    trackedEntity={initialValues['trackedEntity' as unknown as keyof typeof initialValues]}
                  />
                )
              })
            }
            <br />
            <ModalActions>
              <ButtonStrip end className={classNames(styles.modalButtonsStrip)}>
                {modalActions.map((action, i) => {
                  return (
                    <>
                      {
                        !(bulkUpdate && action.id === 'saveandnew') &&
                        <Button
                          key={i}
                          {...action}
                          className={styles.modalButtons}
                          loading={(!!(loading || loadingBulkUpdate) && action.id === clickedButton)}
                        >
                          {action.label}
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
