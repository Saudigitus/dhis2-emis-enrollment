import React, { useState, useRef } from "react";
import { ModalActions, Button, ButtonStrip, Label, NoticeBox } from "@dhis2/ui";
import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalSearchTemplateProps } from "../../types/modal/ModalProps";
import { useParams, useSearchEnrollments } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { formFields } from "../../utils/constants/enrollmentForm/searchEnrollmentForm";
import useGetSearchEnrollmentForm from "../../hooks/form/useGetSearchEnrollmentForm";
import styles from "./modal.module.css"
import { Collapse } from "@material-ui/core";
import WithBorder from "../template/WithBorder";
import { TableComponent } from "../table/components";
import RenderHeader from "../table/render/RenderHeader";
import RenderRows from "../table/render/RenderRows";
import { useGetProgramsAttributes } from "../../hooks/tei/useGetProgramsAttributes";
import { makeStyles } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { SearchInitialValues } from "../../schema/searchInitialValues";
import { getRecentEnrollment } from "../../utils/tei/getRecentEnrollment";
import WithPadding from "../template/WithPadding";
import { IconButton } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { CustomAttributeProps } from "../../types/variables/AttributeColumns";
import classNames from "classnames";

const usetStyles = makeStyles({
  tableContainer: {
    overflowX: 'auto'
  }
});

function ModalSearchEnrollmentContent(props: ModalSearchTemplateProps): React.ReactElement {
  const { setOpen, sectionName, setOpenNewEnrollment } = props;
  const classes = usetStyles()
  const { searchEnrollmentFields } = useGetSearchEnrollmentForm();
  const { registration } = getDataStoreKeys()
  const [showResults, setShowResults] = useState<boolean>(false)
  const { teiAttributes, searchableAttributes } = useGetProgramsAttributes();
  const { enrollmentValues, setEnrollmentValues, loading, getEnrollmentsData } = useSearchEnrollments()
  const [, setInitialValues] = useRecoilState(SearchInitialValues)
  const [attributeKey, setAttributeKey] = useState<string>("unique")
  const [collapseAttributes, setCollapseAttributes] = useState(0)

  const { urlParamiters } = useParams();
  const { school: orgUnit, schoolName: orgUnitName, academicYear } = urlParamiters();

  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);

  const [initialValues] = useState<object>({
    registeringSchool: orgUnitName,
    [registration?.academicYear]: academicYear
  })

  const [queryForm, setQueryForm] = useState<any>({});

  const onHandleChange = ({ target: { value, name } }: { target: { value: any; name: any } }) => {
    if (value.length === 0 || value === null || value === undefined) {
      const updatedForm = { ...queryForm };
      delete updatedForm[name];
      setQueryForm(updatedForm);
    } else {
      setQueryForm((prevQueryForm: any) => ({
        ...prevQueryForm,
        [name]: value,
      }));
    }
  };

  const formattedQuery = () => {
    var query = "";

    // filter collapsed attributes from filled fields
    const selectedObjectIDs: string[] = searchEnrollmentFields[collapseAttributes]?.variables.map((obj: CustomAttributeProps) => obj.id);
    const filteredQueryForm: { [id: string]: string } = {};

    Object.keys(queryForm).forEach(key => {
      if (selectedObjectIDs.includes(key as unknown as string)) {
        filteredQueryForm[key] = queryForm[key];
      }
    });

    for (const [key, value] of Object.entries(filteredQueryForm)) {
      if (key && value) {
        const id = teiAttributes?.filter((element) => {
          return element.name == key;
        })[0].name;

        if (id) {
          query += `${id}:LIKE:${value},`;
        }
      }
    }
    return query;
  }

  const onHandleSubmit = async () => {
    if (formattedQuery().length > 0) {
      getEnrollmentsData(formattedQuery(), setShowResults)
    }
  };


  const onHandleRegisterNew = async () => {
    setInitialValues(attributeKey === "unique" ? {} : queryForm);
    setOpen(false);
    setOpenNewEnrollment(true);
  };

  const onReset = () => {
    setQueryForm({});
    setEnrollmentValues([]);
    setInitialValues({})
    setShowResults(false);
  };

  const searchActions = [
    { id: "cancel", type: "button", label: "Reset", small: true, disabled: loading || !Object.entries(queryForm).length, onClick: () => { onReset()}, display:true },
    //{ id: "continue", type: "button", label: "Register new", small: true, primary: true, disabled: loading, onClick: () => { setOpenNewEnrollment(true); setOpen(false) }, display: !enrollmentValues?.length },
    { id: "search", type: "submit", label: `Search ${sectionName.toLocaleLowerCase()}`, primary: true, small: true, disabled: loading || !Object.entries(queryForm).length, loading, display:true },
  ];

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", small: true, disabled: false, onClick: () => { setOpen(false) } },
    { id: "continue", label: "Register new", primary: true, small: true, disabled: loading, onClick: () => { onHandleRegisterNew() }}
  ];

  const onSelectTei = (teiData: any) => {
    const recentEnrollment = getRecentEnrollment(teiData.enrollments).enrollment
    const recentRegistration = teiData.registrationEvents?.find((event: any) => event.enrollment === recentEnrollment)
    const recentSocioEconomics = teiData.socioEconomicsEvents?.find((event: any) => event.enrollment === recentEnrollment)

    setInitialValues({
      trackedEntity: teiData.trackedEntity,
      ...teiData?.mainAttributesFormatted,
      ...recentRegistration,
      ...recentSocioEconomics,
      [registration.academicYear]: academicYear
    })

    setOpenNewEnrollment(true)
    setOpen(false); 
  }

  return (
    <div>
      <Label>Fill in at least 1 attribute to search.</Label>
      <br />

      {searchEnrollmentFields?.map((group, index) => (
        <div className="mb-3">
          <WithBorder type="all">
            <div className={styles.accordionHeaderContainer} onClick={()=> setCollapseAttributes(index)}>
              <label className={styles.accordionHeader}>Search by {group?.name}</label>
              <IconButton size="small" onClick={()=> setCollapseAttributes(index)} disabled={collapseAttributes === index}> {collapseAttributes === index ? <ExpandLess /> : <ExpandMore />}  </IconButton>
            </div>

            <Collapse in={collapseAttributes === index}>
              <WithBorder type="top">
                <WithPadding>
                  <Form initialValues={{ ...initialValues, orgUnit, ...queryForm }} onSubmit={onHandleSubmit}>
                    {({ handleSubmit, values, form }) => {
                      formRef.current = form;
                      return <form
                        onSubmit={handleSubmit}
                        onChange={(event: any) => onHandleChange(event)}
                      >
                        {
                          formFields(group?.variables, sectionName)?.map((field: any, index: number) => {
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
                        <ButtonStrip className="mr-2" end>
                          {searchActions.map((action, i) => {
                            return (
                              <Button key={i} {...action}>
                                {action.label}
                              </Button>
                            )
                          })}
                        </ButtonStrip>


                      </form>
                    }}
                  </Form>
                </WithPadding>
              </WithBorder>
            </Collapse>
          </WithBorder>
        </div>
        
      ))}
      
      <Collapse in={showResults} style={{}}>
        <>
        {enrollmentValues?.length ?
          <div className="">
              <div className={classNames(styles.accordionHeaderContainer, styles.resultsHeaderContainer)}>
                <label className={styles.accordionHeader}>Results found for {sectionName} search</label>
              </div>
            

            
            <WithBorder type="all">
              <div
                className={classes.tableContainer}
              >
                <TableComponent>
                  <RenderHeader
                    createSortHandler={() => { }}
                    order="asc"
                    orderBy="desc"
                    rowsHeader={searchableAttributes}
                  />
                  <RenderRows
                    headerData={searchableAttributes}
                    rowsData={enrollmentValues}
                    searchActions={true}
                    onSelectTei={onSelectTei}
                  />
                </TableComponent></div>
            </WithBorder>
          </div> : 
          <NoticeBox title={`No ${sectionName} found`}>
            Continue serching or click <strong>'Register new'</strong> if you want to register as a new <strong>{sectionName}</strong>. <br /> <br />
            <Button small primary onClick={() => { onHandleRegisterNew() }} disabled={loading} style={{ marginTop: 50 }}>Register new</Button>
          </NoticeBox> }
        </>
      </Collapse>
      {enrollmentValues?.length ?<ModalActions>
        <div className="d-flex justify-content-between align-items-center w-100">
          {enrollmentValues?.length ? <small>If none of the matches above is the {sectionName} you are searching for, click 'Register new'.</small> : <small></small>}
          <ButtonStrip end>
            {modalActions.map((action, i) => {
              return (
                <Button key={i} {...action} >
                  {action.label}
                </Button>
              )
            })}
          </ButtonStrip>
        </div>
      </ModalActions>: null}
    </div >
  )
}

export default ModalSearchEnrollmentContent;
