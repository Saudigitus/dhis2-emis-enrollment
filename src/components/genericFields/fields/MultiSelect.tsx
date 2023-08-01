import { MultiSelect, MultiSelectOption } from '@dhis2/ui'
import React from 'react'

interface OptionsProps {
    value: string
    label: string
}

interface MutlipleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}

function SelectMultiple(props: MutlipleSelectProps) {
    return (
        <div>
            <MultiSelect
                className="select"
                {...props}
                disabled={props.disabled}

            >
                {props?.options?.map(x =>
                    <MultiSelectOption key={x.value} label={x.label} value={x.value} />
                )}
            </MultiSelect>
        </div>
    )
}

export default SelectMultiple
