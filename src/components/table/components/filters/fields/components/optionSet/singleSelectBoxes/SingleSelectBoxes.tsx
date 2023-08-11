import { Radio, spacersNum, colors } from '@dhis2/ui'
import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyle = makeStyles(() => ({
    iconDeselected: {
        fill: colors.grey700
    },
    checkbox: {
        marginTop: spacersNum.dp8,
        marginBottom: spacersNum.dp16
    }
}));

interface SingleSelectBoxesProps {
    options: { optionSet: { options: [{ label: string, value: string }] } }
    value: any
    id: string
    onChange: (value: any, id?: string) => void
}

function SingleSelectBoxes(props: SingleSelectBoxesProps) {
    const { options, id, onChange, value = "" } = props;
    const classes = useStyle()

    const handleOptionChange = (e: any) => {
        onChange(e.value, id)
    }
    const isChecked = (localValue: string) => {
        return (value.length > 0 && value.includes(localValue));
    }

    return options?.optionSet.options.map(({ label, value }, index: number) => (
        <Radio
            key={index}
            checked={isChecked(value)}
            label={label}
            name={`singleSelectBoxes-${index}`}
            onChange={(e: any) => { handleOptionChange(e); }}
            value={value}
            className={classes.checkbox}
            dense
        />
    ));
}

export default SingleSelectBoxes
