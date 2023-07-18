import { type FormSectionProps } from "../../../types/fields/FieldsTypes";

function formFields(): FormSectionProps[] {
  return [
    {
      section: "Enrollment Details",
      description: "Details related to the enrollment process",
      fields: [
        {
          label: "Registering School",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: true,
          visible: true
        },
        {
          label: "Academic Year",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: true,
          visible: true
        },
        {
          label: "Grade",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Class",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Enrollment Date",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        }
      ]
    },
    {
      section: "Student profile",
      description: "Student personal details",
      fields: [
        {
          label: "Student National ID",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Class Order",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "First Name",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Surname",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Sex",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Date of Birth",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        }
      ]
    },
    {
      section: "Socio-economic details",
      description: "Details about the student socio-economic status",
      fields: [
        {
          label: "Special needs?",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Health Issues?",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        },
        {
          label: "Pratical Skills?",
          attribute: "fieldId",
          valueType: "text",
          placeholder: "Registering",
          disabled: false,
          visible: true
        }
      ]
    }
  ];
}

export { formFields };
