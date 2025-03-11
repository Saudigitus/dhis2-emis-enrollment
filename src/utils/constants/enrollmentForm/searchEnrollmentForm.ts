import { VariablesTypes } from "../../../types/variables/AttributeColumns";
import { FormSectionProps } from "../../../types/form/FormSectionProps";

const staticForm = (sectionName: string) => {
  return {
    registeringSchool: {
      required: false,
      name: "registeringSchool",
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
      id: "registeringSchool",
      displayName: "Registering School",
      header: "Registering School",
      type: VariablesTypes.DataElement,
      assignedValue: undefined
    },
    numberOfStudents: {
      required: false,
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
      placeholder: `Maximum number of ${sectionName}s, supported for each file: 1000`
    }
  }
}

function formFields(variablesData: any[], sectionName: string): FormSectionProps[] {

  return [
    {
        section: "",
        description: "",
        visible: true,
        fields: variablesData
    }
  ];
}

export { formFields, staticForm };
