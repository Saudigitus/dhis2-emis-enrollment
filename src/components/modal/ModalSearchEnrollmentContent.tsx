import React, { useState, useRef, useEffect } from "react";
import { ModalActions, Button, ButtonStrip, Label, Divider, NoticeBox } from "@dhis2/ui";
import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalExportTemplateProps, ModalSearchTemplateProps } from "../../types/modal/ModalProps";
import { useParams, useSearchEnrollments } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import { removeFalseKeys } from "../../utils/commons/removeFalseKeys";
import { formFields } from "../../utils/constants/enrollmentForm/searchEnrollmentForm";
import useGetSearchEnrollmentForm from "../../hooks/form/useGetSearchEnrollmentForm";
import styles from "./modal.module.css"
import Subtitle from "../text/subtitle";
import { Collapse } from "@material-ui/core";
import WithBorder from "../template/WithBorder";
import { Pagination, TableComponent } from "../table/components";
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
    const { searchEnrollmentFields } = useGetSearchEnrollmentForm();
  const { registration, program } = getDataStoreKeys()
  const [showResults, setShowResults] = useState<boolean>(false)
  const { columns } = useEnrollmentsHeader();
  const { teiAttributes } = useGetProgramsAttributes();
  const  { enrollmentValues, setEnrollmentValues, loading, getEnrollmentsData } = useSearchEnrollments()
  const [, setInitialValues] = useRecoilState(SearchInitialValues)
  
  console.log("enrollmentValues", enrollmentValues)

  const { urlParamiters } = useParams();
  const { school: orgUnit, schoolName: orgUnitName, academicYear } = urlParamiters();

  const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);

  const [values, setValues] = useState<Record<string, string>>({})
  const [initialValues] = useState<object>({
    registeringSchool: orgUnitName,
    [registration?.academicYear]: academicYear
  })

  const [queryForm, setQueryForm] = useState<any>({});
  const [page, setpage] = useState(1)
  const [pageSize, setpageSize] = useState(20)

  function onChange(e: any): void {
    //object with form fields data
    setValues(removeFalseKeys(e))
  }

  const onPageChange = (newPage: number) => {
    setpage(newPage)
  }

  const onRowsPerPageChange = (event: any) => {
    setpageSize(parseInt(event.value, 10))
    setpage(1)
  }

  function onSubmit() {
    setShowResults(!showResults);
  }

  const onHandleChange = ({ target: { value, name }, }: { target: { value: any; name: any }; }) => {
    if (value.length === 0 || value === null || value === undefined) {
      delete queryForm[name];
      setQueryForm(queryForm);
    } else {
      setQueryForm({
        ...queryForm,
        [name]: value,
      });
    }
  };

  const formattedQuery = ()=> {
    var query = "";

    for (const [key, value] of Object.entries(queryForm)) {
      console.log("key: ", key)
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
    if(enrollmentValues.length && Object.entries(queryForm).length){
      setInitialValues(queryForm);
      setOpenNewEnrollment(true);
    } else {
      if (formattedQuery().length > 0) {
        getEnrollmentsData(formattedQuery(), setShowResults)
        setShowResults(!showResults);
      }
    }
  };

  const onReset = () => {
    setQueryForm({});
    setEnrollmentValues([]);
    setInitialValues({})
  };

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setOpen(false) } },
    //{ id: "reset", label: "Reset", disabled: loading || !Object.entries(queryForm).length, loading, onClick: () => { setQueryForm({}) } },
    { id: "continue", type: "submit", label: enrollmentValues.length && Object.entries(queryForm).length ? "Register new" : "Search", primary: true, disabled: loading || !Object.entries(queryForm).length, loading }
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
      <Form initialValues={{ ...initialValues, orgUnit }} onSubmit={onHandleSubmit}>
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
            <br />
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
                        
                        {teiAttributes?.filter((el) => el.searchable === true)?.map((attribute, key) =>(
                          <div key={key} className={styles.detailsCard}>
                            <strong className={styles.detailsCardVariable}>{attribute?.displayName}</strong>
                            <Label className={styles.detailsCardLabel}> {enrollment?.mainAttributesFormatted[attribute?.id]} </Label>
                          </div>
                        ))}
                      </div>
                      <div className="col-12 col-md-9">
                        <div className="mb-1 d-flex justify-content-between align-items-center">
                          <Subtitle label={`Enrollments (${enrollment?.registrationEvents?.length})`} />
                          <Button small onClick={() => { onSelectTei(enrollment); setOpenNewEnrollment(true)}} style={{marginTop: 50}}>Select {sectionName}</Button>
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
                  Click <strong>'Continue'</strong> if you want to register as a new <strong>{sectionName}</strong>.
                </NoticeBox> : null
              }

              
              
            </Collapse>
      
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
          </form>
        }}
      </Form>
    </div >
  )
}

export default ModalSearchEnrollmentContent;
