import { Checkbox, spacersNum, CenteredContent, CircularLoader } from '@dhis2/ui';
import { createStyles, type Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import React from 'react'
import { useGetOptionSets } from '../../../../../../../../hooks/optionSets/useGetOptionSets';

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
    options: { optionSet: { id: string } }
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
    const { data, loading } = useGetOptionSets({ optionSetId: options.optionSet.id })

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

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    return data?.result?.options?.map(({ code, displayName }: { code: string, displayName: string }, index: number) => (
        <Checkbox
            key={index}
            checked={isChecked(code)}
            label={displayName}
            name={`multiSelectBoxes-${index}`}
            onChange={(e: any) => { handleOptionChange(e); }}
            value={code}
            className={classes.checkbox}
            dense
        />
    ));
}

export default MultiSelectBoxes
