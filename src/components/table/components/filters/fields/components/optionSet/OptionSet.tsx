import { makeStyles } from '@material-ui/core';
import React from 'react'
import SelectBoxes from './selectBoxes/SelectBoxes';

const getStyles = makeStyles(() => ({
    selectBoxesContainer: {
        maxHeight: 250,
        overflowY: 'auto'
    },
    selectBoxesInnerContainer: {
        marginLeft: 12
    }
}));

interface OptionSetProps {
    onCommitValue: (value: string) => void
    options: any[]
    value: string
    singleSelect: boolean
}

function OptionSet(props: OptionSetProps) {
    const { options, value, singleSelect } = props;
    const classes = getStyles()

    return (
        <div
            className={classes.selectBoxesContainer}
        >
            <div className={classes.selectBoxesInnerContainer}>
                { /* $FlowFixMe */}
                <SelectBoxes
                    optionSet={options}
                    value={value}
                    orientation={"vertical"}
                    singleSelect={!singleSelect}
                    onChange={props.onCommitValue}
                />
            </div>
        </div>
    )
}

export default OptionSet
