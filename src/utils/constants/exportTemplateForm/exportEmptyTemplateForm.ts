import { format } from "date-fns";
import { VariablesTypes } from "../../../types/variables/AttributeColumns";
import { FormSectionProps } from "../../../types/form/FormSectionProps";

const staticForm = () => {
  return {
    registeringSchool: {
      required: true,
      name: "orgUnitName",
      labelName: "School",
      valueType: "TEXT",
      options: undefined,
      disabled: true,
      pattern: "",
      visible: true,
      description: "School",
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "orgUnitName",
      displayName: "School",
      header: "School",
      type: VariablesTypes.DataElement,
      assignedValue: undefined
    },
    numberOfStudents: {
      required: true,
      name: "studentsNumber",
      labelName: "Number of Students",
      valueType: "NUMBER",
      options: undefined,
      disabled: false,
      pattern: "",
      visible: true,
      description: "Number of Students",
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "studentsNumber",
      displayName: "Number of Students",
      header: "Number of Students",
      type: VariablesTypes.DataElement,
      assignedValue: undefined,
      placeholder: "Maximum number of students supported for each file: 1000"
    }
  }
}

function formFields(apiFormData: any[], sectionName: string): FormSectionProps[] {
  const [enrollmentDetails = []] = apiFormData;
  return [
    {
      section: "Details",
      description: `This file will allow the import of new ${sectionName} data into the system.`,
      visible: true,
      fields: [
        staticForm().registeringSchool,
        ...enrollmentDetails,
        staticForm().numberOfStudents
      ]
    }
  ];
}

export { formFields, staticForm };
