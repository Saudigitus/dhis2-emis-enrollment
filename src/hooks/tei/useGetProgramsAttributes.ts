import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponseTEI } from "../../utils/tei/formatResponseAttributes";
import { CustomAttributeProps, VariablesTypes } from "../../types/variables/AttributeColumns";
import { Attribute } from "../../types/generated/models";

function useGetProgramsAttributes() {
    const programConfigState = useRecoilValue(ProgramConfigState);

    const staticHeaders: CustomAttributeProps[] = [
        {
            id: "enrollmentsNumber",
            displayName: "Enrollments",
            header: "Enrollments",
            required: false,
            name: "enrollmentsNumber",
            labelName: "Enrollments",
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            options: undefined as unknown as CustomAttributeProps["options"],
            visible: true,
            disabled: false,
            pattern: '',
            searchable: false,
            error: false,
            content: '',
            key: '',
            type: VariablesTypes.Attribute
        },
        {
            id: "actions",
            displayName: "Actions",
            header: "Actions",
            required: false,
            name: "actions",
            labelName: "Actions",
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            options: undefined as unknown as CustomAttributeProps["options"],
            visible: true,
            disabled: false,
            pattern: '',
            searchable: false,
            error: false,
            content: '',
            key: '',
            type: VariablesTypes.Attribute
        }
    ]

    return {
        teiAttributes: formatResponseTEI(programConfigState),
        searchableAttributes: formatResponseTEI(programConfigState)?.filter((attr) => attr?.unique === true || attr.searchable === true).concat(staticHeaders),
    }
}
export { useGetProgramsAttributes }
