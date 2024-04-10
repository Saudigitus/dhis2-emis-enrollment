import React, { useState, useRef, useEffect } from "react";
import { ModalActions, Button, ButtonStrip, Label, Divider, NoticeBox } from "@dhis2/ui";
import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalSearchTemplateProps } from "../../types/modal/ModalProps";
import { useParams, useSearchEnrollments } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { formFields } from "../../utils/constants/enrollmentForm/searchEnrollmentForm";
import useGetSearchEnrollmentForm from "../../hooks/form/useGetSearchEnrollmentForm";
import styles from "./modal.module.css"
import Subtitle from "../text/subtitle";
import { Collapse } from "@material-ui/core";
import WithBorder from "../template/WithBorder";
import { TableComponent } from "../table/components";
import RenderHeader from "../table/render/RenderHeader";
import RenderRows from "../table/render/RenderRows";
import { useGetProgramsAttributes } from "../../hooks/tei/useGetProgramsAttributes";
import { useEnrollmentsHeader } from "../../hooks/tableHeader/useEnrollmentsHeader";
import { makeStyles } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { SearchInitialValues } from "../../schema/searchInitialValues";
import { getRecentEnrollment } from "../../utils/tei/getRecentEnrollment";

const usetStyles = makeStyles({
  tableContainer: {
      overflowX: 'auto'
  }
});

function ModalSearchEnrollmentContent(props: ModalSearchTemplateProps): React.ReactElement {
  const { setOpen, sectionName, setOpenNewEnrollment } = props;
  const classes = usetStyles()
  const { searchEnrollmentFields, buildSearhForm } = useGetSearchEnrollmentForm();
  const { registration } = getDataStoreKeys()
  const [showResults, setShowResults] = useState<boolean>(false)
  const { columns } = useEnrollmentsHeader();
  const { teiAttributes, attributesToDisplay } = useGetProgramsAttributes();
  const  { enrollmentValues, setEnrollmentValues, loading, getEnrollmentsData } = useSearchEnrollments()
  const [, setInitialValues] = useRecoilState(SearchInitialValues)
  const [attributeKey, setAttributeKey] = useState<string>("unique")
  
  const { urlParamiters } = useParams();
  const { school: orgUnit, schoolName: orgUnitName, academicYear } = urlParamiters();

  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);

  const [initialValues] = useState<object>({
    registeringSchool: orgUnitName,
    [registration?.academicYear]: academicYear
  })

  const [queryForm, setQueryForm] = useState<any>({});

  useEffect(() => {
    buildSearhForm({ attributeKey });
  }, [attributeKey]);

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

  const formattedQuery = ()=> {
    var query = "";

    for (const [key, value] of Object.entries(queryForm)) {
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
    setInitialValues(queryForm);
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
    { id: "cancel", type: "button", label: showResults ? "Reset" : "Cancel", small: true, disabled: loading, onClick: () => { Object.entries(queryForm).length ? onReset() : setOpen(false) } },
    //{ id: "searchMore", label:  "Search by other attributes", small: true, disabled: loading || !Object.entries(queryForm).length, onClick: () => { setQueryForm({}), setAttributeKey("searchable") } },
    { id: "search", type: "submit", label:  "Search", small: true, primary: true, disabled: loading || !Object.entries(queryForm).length, loading }
  ];

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setOpen(false) } },
    { id: "continue", label: "Register new", primary: true, disabled: loading || !Object.entries(queryForm).length, onClick: () => { onHandleRegisterNew() } }
  ];

  const onSelectTei = (teiData: any) => {
    const recentEnrollment = getRecentEnrollment(teiData.enrollments).enrollment
    const recentRegistration = teiData.registrationEvents?.find((event: any) => event.enrollment === recentEnrollment)
    const recentSocioEconomics = teiData.socioEconomicsEvents?.find((event: any) => event.enrollment === recentEnrollment)

    setInitialValues({
      trackedEntity: teiData.trackedEntity,
      ...teiData?.mainAttributesFormatted,
      ...recentRegistration,
      ...recentSocioEconomics
    })
  }

  return (
    <div>
      <Form initialValues={{ ...initialValues, orgUnit, ...queryForm }} onSubmit={onHandleSubmit}>
        {({ handleSubmit, values, form }) => {
          formRef.current = form;
          return <form
            onSubmit={handleSubmit}
            onChange={(event: any) => onHandleChange(event)}
          >
            {
              formFields(searchEnrollmentFields, sectionName)?.map((field: any, index: number) => {
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
            <ButtonStrip className="ml-3">
              {searchActions.map((action, i) => {
                return (
                  <Button key={i} {...action} >
                    {action.label}
                  </Button>
                )
              })}
            </ButtonStrip>
            <Divider />
            <Collapse in={showResults} style={{}}>
              {enrollmentValues.length ? 
                enrollmentValues?.map((enrollment: any, index: number) => (
                  <>
                    <div className="row w-100" key={index}>
                      <div className="col-12 col-md-3">
                        <div style={{marginBottom: 10}}>
                          <Subtitle label={"Enrollment details"} />
                        </div>
                        
                        {attributesToDisplay?.map((attribute, key) =>(
                          <div key={key} className={styles.detailsCard}>
                            <strong className={styles.detailsCardVariable}>{attribute?.displayName}</strong>
                            <Label className={styles.detailsCardLabel}> {enrollment?.mainAttributesFormatted[attribute?.id]} </Label>
                          </div>
                        ))}
                      </div>
                      <div className="col-12 col-md-9">
                        <div className="mb-1 d-flex justify-content-between align-items-center">
                          <Subtitle label={`Enrollments (${enrollment?.registrationEvents?.length})`} />
                          <Button small onClick={() => { onSelectTei(enrollment); setOpen(false); setOpenNewEnrollment(true)}} disabled={loading} style={{marginTop: 50}}>Select {sectionName}</Button>
                        </div>
                        
                        {enrollment?.registrationEvents?.length ?
                          <WithBorder type="all">
                            <div
                          className={classes.tableContainer}
                      >
                            <TableComponent>
                              <RenderHeader
                                createSortHandler={() => {}}
                                order="asc"
                                orderBy="desc"
                                rowsHeader={columns}
                              />
                              <RenderRows
                                headerData={columns}
                                rowsData={enrollment?.registrationEvents}
                              />
                            </TableComponent></div>                      
                          </WithBorder>
                          : <small>No enrollments found.</small>
                        }
                      </div>
                      
                    </div>
                <br />
                    <Divider />
                  </>
                  
                ))
                : !loading ?
                <NoticeBox title={`No ${sectionName} found`}>
                  Click <strong>'Register new'</strong> if you want to register as a new <strong>{sectionName}</strong>.
                  {attributeKey === "unique" ? <>  <br /> <br /> <Button small onClick={() => { setQueryForm({}), setAttributeKey("searchable"), setShowResults(false) }} disabled={loading} style={{marginTop: 50}}>Search by more attributes</Button></> : null}
                </NoticeBox> : null
              }
            </Collapse>
          </form>
        }}
      </Form>
      {(showResults && attributeKey === "searchable") || enrollmentValues?.length ? 
        <ModalActions>
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
        </ModalActions>
        : null}
    </div >
  )
}

export default ModalSearchEnrollmentContent;
