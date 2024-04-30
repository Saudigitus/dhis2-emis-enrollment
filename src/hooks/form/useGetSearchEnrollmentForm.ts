import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes';
import { CustomAttributeProps } from '../../types/variables/AttributeColumns';

export default function useGetSearchEnrollmentForm() {
    const [searchEnrollmentFields, setSearchEnrollmentFields] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()

    const buildSearhForm = () => {
        if (Object.keys(getDataStoreData)?.length && getProgram !== undefined) {

            const formSearchableAttributes = formatResponseTEI(getProgram).filter((element) => element.unique === true || element.searchable === true).map((el) => { return { ...el, disabled: false, required: false}})

            setSearchEnrollmentFields(groupAttributes(formSearchableAttributes))
        }
    }

    const groupAttributes = (variables: CustomAttributeProps[]) => {
        const uniqueObjectGroups: { name: string, id: string, variables: CustomAttributeProps[] }[] = [];
        const searchableObjects: CustomAttributeProps[] = [];

        variables.forEach(variable => {
            if (variable.unique) {
                const groupIndex = uniqueObjectGroups.findIndex(group => group.name === variable.displayName);
                if (groupIndex === -1) {
                uniqueObjectGroups.push({ name: variable.displayName, id: variable.id, variables: [variable] });
                } else {
                uniqueObjectGroups[groupIndex].variables.push(variable);
                }
            } else {
                searchableObjects.push(variable);
            }
        });

        const resultArray: { name: string, id: string, variables: CustomAttributeProps[] }[] = uniqueObjectGroups.concat([{ name: "Attributes", id: "attributes", variables: searchableObjects }]);
        return resultArray;

    }

    useEffect(() => {
        buildSearhForm();
    }, []);

    return { searchEnrollmentFields }
}
