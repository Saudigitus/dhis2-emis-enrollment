import { CheckIsRowSelectedProps } from "../../types/utils/CommonsTypes";

export const checkIsRowSelected = ({ rawRowData, selected }: CheckIsRowSelectedProps) => {
    const newArray = [...selected.selectedRows];
    const existingIndex = newArray.findIndex((item: any) => item.trackedEntity === rawRowData.trackedEntity);

    if (existingIndex !== -1) {
        newArray.splice(existingIndex, 1); // Remover o objeto existente
    } else {
        newArray.push(rawRowData); // Adicionar o novo objeto
    }
    return newArray;
}