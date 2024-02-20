import { HeadBarTypes, SelectedOptionsTypes } from "../../../types/headBar/HeadBarTypes";
import { filterItem, dataStoreRecord } from "../../../types/dataStore/DataStoreConfig";
import { programStageDataElements } from "../../../types/programStageConfig/ProgramStageConfig";
import { formatCamelCaseToWords } from "../../commons/formatCamelCaseToWords";

export const headBarDataElements = (selectedOptions : SelectedOptionsTypes, getDataStoreData: dataStoreRecord, programStageDataElements: programStageDataElements[]) : HeadBarTypes[] => {
    const headBarFilters : HeadBarTypes[] = []

    getDataStoreData?.filters?.dataElements.map((filter : filterItem) => {

        if(programStageDataElements){
            let headBarFilterName : string  = '';

            const dataElement = programStageDataElements?.find((psDataElement: any) => psDataElement?.dataElement?.id === filter?.dataElement)?.dataElement;
            
            if (dataElement) headBarFilterName = dataElement.displayName;
            
            headBarFilters.push({
                id: filter.code,
                label: headBarFilterName,
                value: selectedOptions[filter.code as unknown as keyof typeof selectedOptions] ?? `Select a ${formatCamelCaseToWords(filter.code)}`,
                placeholder: `Search for ${formatCamelCaseToWords(filter.code)}`,
                dataElementId: filter.dataElement,
                component: "menuItemContainer",
                selected: Boolean(selectedOptions[filter.code as unknown as keyof typeof selectedOptions]),
            })
        }
        
    })

    return headBarFilters
}