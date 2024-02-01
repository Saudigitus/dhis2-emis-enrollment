import { makeStyles } from '@material-ui/core';
import React from 'react'
import SelectBoxes from './selectBoxes/SelectBoxes';
import { OptionSetProps } from '../../../../../../../types/common/components';

const getStyles = makeStyles(() => ({
    selectBoxesContainer: {
        maxHeight: 250,
        overflowY: 'auto'
    },
    selectBoxesInnerContainer: {
        marginLeft: 12
    }
}));


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
                    options={options}
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
