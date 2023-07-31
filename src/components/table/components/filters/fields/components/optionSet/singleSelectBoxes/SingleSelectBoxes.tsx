import { Radio, spacersNum, colors, CenteredContent, CircularLoader } from '@dhis2/ui'
import { makeStyles } from '@material-ui/core';
import React from 'react'
import { useGetOptionSets } from '../../../../../../../../hooks/optionSets/useGetOptionSets';

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
    options: { optionSet: { id: string } }
    value: any
    id: string
    onChange: (value: any, id?: string) => void
}

function SingleSelectBoxes(props: SingleSelectBoxesProps) {
    const { options, id, onChange, value = "" } = props;
    const classes = useStyle()
    const { data, loading } = useGetOptionSets({ optionSetId: options.optionSet.id })

    const handleOptionChange = (e: any) => {
        onChange(e.value, id)
    }
    const isChecked = (localValue: string) => {
        return (value.length > 0 && value.includes(localValue));
    }

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    return data?.result?.options?.map(({ code, displayName }: { code: string, displayName: string }, index: number) => (
        <Radio
            key={index}
            checked={isChecked(code)}
            label={displayName}
            name={`singleSelectBoxes-${index}`}
            onChange={(e: any) => { handleOptionChange(e); }}
            value={code}
            className={classes.checkbox}
            dense
        />
    ));
}

export default SingleSelectBoxes
