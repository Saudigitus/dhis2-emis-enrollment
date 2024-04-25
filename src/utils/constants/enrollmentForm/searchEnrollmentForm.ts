import { VariablesTypes } from "../../../types/variables/AttributeColumns";
import { FormSectionProps } from "../../../types/form/FormSectionProps";

const staticForm = () => {
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
  const [enrollmentDetails = [], studentsProfile = []] = apiFormData;
  
  //console.log("studentProfile", studentsProfile)
  return [
    {
        section: "Enrollment Details",
        description: "Details related to the enrollment process. Fill in at least 1 attribute to search.",
        visible: true,
        fields: [
            staticForm().registeringSchool,
            ...enrollmentDetails,
            ...studentsProfile,
        ]
    }
  ];
}

export { formFields, staticForm };