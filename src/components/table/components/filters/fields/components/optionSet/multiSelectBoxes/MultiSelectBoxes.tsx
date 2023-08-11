import { Checkbox, spacersNum } from '@dhis2/ui';
import { createStyles, type Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: theme.typography.body1,
        checkbox: {
            marginTop: spacersNum.dp8,
            marginBottom: spacersNum.dp16
        }
    })
);

interface MultiSelectBoxesProps {
    options: { optionSet: { options: [{ label: string, value: string }] } }
    value: any
    id: string
    onChange: (value: any, id?: string, type?: string) => void
    valueType?: string
    orientation?: string
}

let checkedValues = "";
function MultiSelectBoxes(props: MultiSelectBoxesProps) {
    const { options, id, onChange, value = "", valueType } = props;
    const classes = useStyles()

    const handleOptionChange = (e: { checked: boolean, value: string }) => {
        checkedValues = value;
        if (e.checked) {
            checkedValues = checkedValues + e.value + ","
        } else {
            const localValue = checkedValues.split(",")
            checkedValues = localValue.filter(x => x !== e.value).join(",");
        }
        onChange(checkedValues, id, valueType)
        checkedValues = ""
    }

    const isChecked = (e: string) => {
        if (value.length === 0) {
            return false;
        }
        return value.split(",").filter((x: string) => x === e).length > 0;
    }

    return options?.optionSet.options.map(({ label, value }, index: number) => (
        <Checkbox
            key={index}
            checked={isChecked(value)}
            label={label}
            name={`multiSelectBoxes-${index}`}
            onChange={(e: any) => { handleOptionChange(e); }}
            value={value}
            className={classes.checkbox}
            dense
        />
    ));
}

export default MultiSelectBoxes
