import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createNumberRange
} from '@dhis2/ui'
import React from 'react'
import style from "./fields.module.css";
import { formatToString } from './formatters'
import { type GenericFieldsProps } from '../../../types/fields/GenericFieldsTypes';

const { Field } = ReactFinalForm

// Omitting the underscore here since it messes up i18n
const lowerbound = 1
const upperbound = 86400

const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(lowerbound, upperbound)
)

function InputNumber(props: GenericFieldsProps) {
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
