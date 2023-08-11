import React from 'react'
import MultiSelectBoxes from '../multiSelectBoxes/MultiSelectBoxes';
import SingleSelectBoxes from '../singleSelectBoxes/SingleSelectBoxes';

interface SelectBoxesProps {
    singleSelect?: boolean
    options: { optionSet: { options: [{ value: string, label: string }] } }
    onChange: (value: any, id?: string, type?: string) => void
    value: any
    id: string
    orientation?: any
}

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
