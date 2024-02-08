import { ReactFinalForm, SwitchFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'
import { SwitchFieldProps } from '../../../types/form/GenericFieldsTypes'
const { Field } = ReactFinalForm

function SwitchInput(props: SwitchFieldProps) {
    return (
        <Field
            {...props}
            type="checkbox"
            component={SwitchFieldFF}
            validate={(Boolean(props.required)) && hasValue}
            disabled={props.disabled}
        />
    )
}

export default SwitchInput
