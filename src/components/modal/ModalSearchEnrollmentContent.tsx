import React, { useState, useRef, useEffect } from "react";
import { ModalActions, Button, ButtonStrip, Label, Divider } from "@dhis2/ui";
import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalExportTemplateProps } from "../../types/modal/ModalProps";
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

const usetStyles = makeStyles({
  tableContainer: {
      overflowX: 'auto'
  }
});

function ModalSearchEnrollmentContent(props: ModalExportTemplateProps): React.ReactElement {
  const { setOpen, sectionName } = props;
    const classes = usetStyles()
    const { searchEnrollmentFields } = useGetSearchEnrollmentForm();
  const { registration, program } = getDataStoreKeys()
  const [showResults, setShowResults] = useState<boolean>(false)
  const { columns } = useEnrollmentsHeader();
  const { teiAttributes } = useGetProgramsAttributes();
  const  { enrollmentValues, error, loading, getEnrollmentsData, totalResults } = useSearchEnrollments()
  
  console.log("enrollmentValues", enrollmentValues)
  console.log("teiAttributes", teiAttributes)

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
    console.log("allfieldsData", values)
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
    console.log("formattedQuery", formattedQuery())
    console.log("formattedFormattedQuery", formattedQuery().slice(0, -1))
    if (formattedQuery().length > 0) {
      getEnrollmentsData(formattedQuery(), setShowResults)
      setShowResults(!showResults);
    }
  };

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setOpen(false) } },
    { id: "continue", type: "submit", label: "Continue", primary: true, disabled: loading, loading }
  ];

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
            <Collapse in={showResults} style={{maxHeight: 250, overflowY: "auto"}}>

              {enrollmentValues?.map((enrollment: any, index: number) => (
                <>
                  <div className="row w-100" key={index}>
                    <div className="col-12 col-md-3">
                      <Subtitle label={"Enrollment details"} />
                      {teiAttributes?.filter((el) => el.searchable === true)?.map((attribute, key) =>(
                        <div key={key} className={styles.detailsCard}>
                          <strong className={styles.detailsCardVariable}>{attribute?.displayName}</strong>
                          <Label className={styles.detailsCardLabel}> {enrollment?.mainAttributesFormatted[attribute?.id]} </Label>
                        </div>
                      ))}
                    </div>
                    <div className="col-12 col-md-9">
                      <Subtitle label={`Enrollments (${enrollment?.registrationEvents?.length})`} />
                      
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
                        : null
                      }
                    </div>
                    
                  </div>
              <br />
                  <Divider />
                </>
                
              ))}
              
            </Collapse>
      
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

export default ModalSearchEnrollmentContent;
