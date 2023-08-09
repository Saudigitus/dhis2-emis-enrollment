import { type FormSectionProps } from "../../../types/fields/FieldsTypes";
import { Attribute } from "../../../types/generated/models";
import { type CustomAttributeProps } from "../../../types/table/AttributeColumns";

const staticForm = () => {
  return {
    registeringSchool: {
      required: true,
      valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
      options: {
        optionSet: {
          options: [
            {
              code: "sd",
              value: "2023",
              label: "2023"
            }
          ],
          id: "Uf8qxWOW81d"
        }
      },
      labelName: "Registering School",
      name: "registerschoolstaticform",
      disabled: false,
      pattern: "",
      visible: true,
      description: "Registering School",
      searchable: false,
      error: false,
      content: "",
      id: "registerschoolstaticform",
      displayName: "Registering School",
      header: "Registering School",
      type: ""
    }
    // enrollmentDate: {
    //   compulsory: true,
    //   displayInReports: true,
    //   dataElement: {
    //     displayInReports: true,
    //     valueType: "DATE",
    //     displayName: "Enrollment Date",
    //     id: "enrollmentdatestaticform"
    //   }
    // }
  }
}

function formFields(enrollmentsData: any[]): FormSectionProps[] {
  const [enrollmentDetails, studentsProfile, socioEconomicDetails] = enrollmentsData;
  return [
    {
      section: "Enrollment Details",
      description: "Details related to the enrollment process",
      fields: [
        ...enrollmentDetails
      ]
    },
    {
      section: "Student profile",
      description: "Student personal details",
      fields: [
        ...studentsProfile
      ]
    },
    {
      section: "Socio-economic details",
      description: "Details about the student socio-economic status",
      fields: [
        ...socioEconomicDetails
      ]
    }
  ];
}

export { formFields, staticForm };
