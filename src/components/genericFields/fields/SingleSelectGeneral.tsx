import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import React from 'react'

interface OptionsProps {
    value: string
    label: string
}

interface SingleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}

function SingleSelect(props: SingleSelectProps) {
    return (
        <div>
            <SingleSelectField
                className="select"
                {...props}

            >
                {props?.options?.map(x =>
                    <SingleSelectOption key={x.value} label={x.label} value={x.value} />
                )}
            </SingleSelectField>
        </div>
    )
}

export default SingleSelect
