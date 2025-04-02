import { format } from "date-fns";
import { VariablesTypes } from "../../../types/variables/AttributeColumns";
import { FormSectionProps } from "../../../types/form/FormSectionProps";

const staticForm = (sectionName: string) => {
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
      labelName: `Number of ${sectionName}s`,
      valueType: "NUMBER",
      options: undefined,
      disabled: false,
      pattern: "",
      visible: true,
      description: `Number of ${sectionName}s`,
      searchable: false,
      error: false,
      programStage: "",
      content: "",
      id: "studentsNumber",
      displayName: `Number of ${sectionName}s`,
      header: `Number of ${sectionName}s`,
      type: VariablesTypes.DataElement,
      assignedValue: undefined,
      placeholder: `Maximum number of ${sectionName.toLowerCase()}s supported for each file: 1000`
    }
  }
}

function formFields(apiFormData: any[], sectionName: string): FormSectionProps[] {
  const [enrollmentDetails = []] = apiFormData;
  return [
    {
      section: "Details",
      description: `This file will allow the import of new ${sectionName.toLowerCase()} data into the system.`,
      visible: true,
      fields: [
        staticForm(sectionName).registeringSchool,
        ...enrollmentDetails,
        staticForm(sectionName).numberOfStudents
      ]
    }
  ];
}

export { formFields, staticForm };
