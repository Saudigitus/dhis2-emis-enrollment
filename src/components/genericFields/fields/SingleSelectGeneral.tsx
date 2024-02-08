import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import React from 'react'
import { SingleSelectProps } from '../../../types/form/GenericFieldsTypes'

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
