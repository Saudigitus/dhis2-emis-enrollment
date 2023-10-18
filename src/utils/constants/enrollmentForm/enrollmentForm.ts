import { format } from "date-fns";
import { type FormSectionProps } from "../../../types/fields/FieldsTypes";
import { VariablesTypes } from "../../../types/table/AttributeColumns";

const staticForm = () => {
  return {
    registeringSchool: {
      required: true,
      name: "registerschoolstaticform",
      labelName: "Registering School",
      valueType: "TEXT",
      options: undefined,
      disabled: true,
      pattern: "",
      visible: true,
      description: "Registering School",
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "registerschoolstaticform",
      displayName: "Registering School",
      header: "Registering School",
      type: VariablesTypes.DataElement,
      assignedValue: undefined
    },
    enrollmentDate: {
      required: true,
      name: "eventdatestaticform",
      labelName: "Enrollment date",
      valueType: "DATE",
      options: undefined,
      disabled: false,
      pattern: "",
      visible: true,
      description: "Enrollment date",
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "eventdatestaticform",
      displayName: "Enrollment date",
      header: "Enrollment date",
      type: VariablesTypes.DataElement,
      assignedValue: format(new Date(), "yyyy-MM-dd")
    }
  }
}

function formFields(enrollmentsData: any[]): FormSectionProps[] {
  const [enrollmentDetails, studentsProfile, socioEconomicDetails] = enrollmentsData;
  return [
    {
      section: "General details",
      description: "Details related to the enrollment process",
      fields: [
        staticForm().registeringSchool,
        ...enrollmentDetails,
        staticForm().enrollmentDate
      ]
    },
    {
      section: "Staff profile",
      description: "Staff personal details",
      fields: [
        ...studentsProfile
      ]
    },
    {
      section: "Staff details",
      description: "Details about the staff details",
      fields: [
        ...socioEconomicDetails
      ]
    }
  ];
}

export { formFields, staticForm };
