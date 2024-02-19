import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createNumberRange
} from '@dhis2/ui'
import React from 'react'
import style from "./Fields.module.css";
import { formatToString } from '../../../utils/commons/formatToString'
import { FormFieldsProps } from '../../../types/form/GenericFieldsTypes';

const { Field } = ReactFinalForm

// Omitting the underscore here since it messes up i18n
const lowerbound = 1
const upperbound = 86400

const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(lowerbound, upperbound)
)

function InputNumber(props: FormFieldsProps) {
    return (
        <Field
            {...props}
            component={InputFieldFF}
            validate={(Boolean(props.required)) && VALIDATOR}
            type={props.type}
            format={formatToString}
            disabled={props.disabled}
            className={style.textfield}
        />
    )
}

export default InputNumber
