import React from 'react'
import MultiSelectBoxes from '../multiSelectBoxes/MultiSelectBoxes';
import SingleSelectBoxes from '../singleSelectBoxes/SingleSelectBoxes';

interface OptionProps {
    value: string
    label: string
}

interface SelectBoxesProps {
    singleSelect?: boolean
    optionSets?: OptionProps[]
    onChange: (e: any, id?: string, type?: string, position?: string) => void
    value: any
    id?: string
    orientation?: any
}

function SelectBoxes(props: SelectBoxesProps) {
    const { singleSelect, optionSets, onChange, id, ...passOnProps } = props;

    const SelectBoxesTypeComponent = (singleSelect ?? false) ? SingleSelectBoxes : MultiSelectBoxes;

    return (
        <SelectBoxesTypeComponent
            {...passOnProps}
            value={props.value}
            onChange={onChange}
        />
    );
}

export default SelectBoxes
