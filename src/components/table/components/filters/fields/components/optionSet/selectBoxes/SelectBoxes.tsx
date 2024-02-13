import React from 'react'
import MultiSelectBoxes from '../multiSelectBoxes/MultiSelectBoxes';
import SingleSelectBoxes from '../singleSelectBoxes/SingleSelectBoxes';
import { SelectBoxesProps } from '../../../../../../../../types/table/ContentFiltersProps';

function SelectBoxes(props: SelectBoxesProps) {
    const { singleSelect, onChange, ...passOnProps } = props;

    const SelectBoxesTypeComponent = (singleSelect ?? false) ? SingleSelectBoxes : MultiSelectBoxes;

    return (
        <SelectBoxesTypeComponent
            {...passOnProps}
            value={props?.value}
            onChange={onChange}
        />
    );
}

export default SelectBoxes
