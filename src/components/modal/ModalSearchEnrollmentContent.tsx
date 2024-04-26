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
import WithPadding from "../template/WithPadding";
import { IconButton } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const usetStyles = makeStyles({
  tableContainer: {
    overflowX: 'auto'
  }
});

function ModalSearchEnrollmentContent(props: ModalSearchTemplateProps): React.ReactElement {
  const { setOpen, sectionName, setOpenNewEnrollment } = props;
  var attributeCounter = useRef(0)
  const classes = usetStyles()
  const { searchEnrollmentFields, isSearchable } = useGetSearchEnrollmentForm();
  const { registration } = getDataStoreKeys()
  const [showResults, setShowResults] = useState<boolean>(false)
  const { columns } = useEnrollmentsHeader();
  const { teiAttributes, attributesToDisplay } = useGetProgramsAttributes();
  const { enrollmentValues, setEnrollmentValues, loading, getEnrollmentsData } = useSearchEnrollments()
  const [, setInitialValues] = useRecoilState(SearchInitialValues)
  const [attributeKey, setAttributeKey] = useState<string>("unique")
  const [collapseAttributes, setCollapseAttributes] = useState(`id-${0}`)

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
    //{ id: "cancel", type: "button", label: showResults ? "Reset" : "Cancel", small: true, disabled: loading, onClick: () => { Object.entries(queryForm).length ? onReset() : setOpen(false) }, display:true },
    //{ id: "continue", type: "button", label: "Register new", small: true, primary: true, disabled: loading, onClick: () => { setOpenNewEnrollment(true); setOpen(false) }, display: !enrollmentValues?.length },
    { id: "search", type: "submit", label: `Search ${sectionName}`, small: true, disabled: loading || !Object.entries(queryForm).length, loading, display:true },
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


  const onAddMoreAttributes = () => {
    attributeCounter.current++
    setQueryForm({});
    if (isSearchable) {
      setAttributeKey("searchable");
    }
    setShowResults(false)
  }


  return (
    <div>
      <Label>Fill in at least 1 attribute to search.</Label>
      <br />

      {searchEnrollmentFields?.map((group, index) => (
        <div className="mb-3">
          <WithBorder type="all">
            <div className={styles.accordionHeaderContainer} onClick={()=> setCollapseAttributes(`id-${index}`)}>
              <label className={styles.accordionHeader}>Search by {group?.name}</label>
              <IconButton size="small" onClick={()=> setCollapseAttributes(`id-${index}`)} disabled={collapseAttributes === `id-${index}`}> {collapseAttributes === `id-${index}` ? <ExpandLess /> : <ExpandMore />}  </IconButton>
            </div>

            <Collapse in={collapseAttributes === `id-${index}`}>
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
                              <Button key={i} {...action} >
                                {action.label}
                              </Button>
                            )
                          })}
                        </ButtonStrip>

                        <Collapse in={showResults} style={{}}>
                          {enrollmentValues.length ?
                            enrollmentValues?.map((enrollment: any, index: number) => (
                              <>
                                <div className="row w-100" key={index}>
                                  <div className="col-12 col-md-3">
                                    <div style={{ marginBottom: 10 }}>
                                      <Subtitle label={"Enrollment details"} />
                                    </div>

                                    {attributesToDisplay?.map((attribute, key) => (
                                      <div key={key} className={styles.detailsCard}>
                                        <strong className={styles.detailsCardVariable}>{attribute?.displayName}</strong>
                                        <Label className={styles.detailsCardLabel}> {enrollment?.mainAttributesFormatted[attribute?.id]} </Label>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="col-12 col-md-9">
                                    <div className="mb-1 d-flex justify-content-between align-items-center">
                                      <Subtitle label={`Enrollments (${enrollment?.registrationEvents?.length})`} />
                                      <Button small onClick={() => { onSelectTei(enrollment); setOpen(false); setOpenNewEnrollment(true) }} disabled={loading} style={{ marginTop: 50 }}>Select {sectionName}</Button>
                                    </div>

                                    {enrollment?.registrationEvents?.length ?
                                      <WithBorder type="all">
                                        <div
                                          className={classes.tableContainer}
                                        >
                                          <TableComponent>
                                            <RenderHeader
                                              createSortHandler={() => { }}
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
                                {attributeKey === "searchable" ? <>Click <strong>'Register new'</strong> if you want to register as a new <strong>{sectionName}</strong>.</> : <>Click the bottom below to continue searching for a <strong>{sectionName}</strong>.</>}

                                {attributeKey === "unique" ? <>  <br /> <br /> <Button small onClick={() => { onAddMoreAttributes() }} disabled={loading} style={{ marginTop: 50 }}>Search by more attributes</Button></> : null}
                              </NoticeBox> : null
                          }
                        </Collapse>
                      </form>
                    }}
                  </Form>
                </WithPadding>
              </WithBorder>
            </Collapse>
          </WithBorder>
        </div>
        
      ))}
      
      
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
