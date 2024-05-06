import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { formatResponseTEI } from '../../utils/tei/formatResponseAttributes';
import { CustomAttributeProps } from '../../types/variables/AttributeColumns';
import { GroupedSearchableAttributesTypes } from '../../types/variables/GroupedSearchableAttributesTypes';

export default function useGetSearchEnrollmentForm() {
    const [searchEnrollmentFields, setSearchEnrollmentFields] = useState<GroupedSearchableAttributesTypes[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()

    const buildSearhForm = () => {
        if (Object.keys(getDataStoreData)?.length && getProgram !== undefined) {

            const formSearchableAttributes = formatResponseTEI(getProgram).filter((element) => element.unique === true || element.searchable === true).map((el) => { return { ...el, disabled: false, required: false}})

            setSearchEnrollmentFields(groupAttributes(formSearchableAttributes))
        }
    }

    const groupAttributes = (variables: CustomAttributeProps[]) => {
        const uniqueObjectGroups: GroupedSearchableAttributesTypes[] = [];
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

        const resultArray: GroupedSearchableAttributesTypes[] = uniqueObjectGroups.concat([{ name: "Attributes", id: "attributes", variables: searchableObjects }]);
        return resultArray;

    }

    useEffect(() => {
        buildSearhForm();
    }, []);

    return { searchEnrollmentFields }
}
