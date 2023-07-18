import { Checkbox, spacersNum } from '@dhis2/ui'
import { withStyles } from '@material-ui/core';
import React from 'react'

const styles = theme => ({
    label: theme.typography.formFieldTitle,
    checkbox: {
        marginTop: spacersNum.dp8,
        marginBottom: spacersNum.dp16,
    },
});
function TrueOnly(props) {
    const { header, classes, id, onChange, value } = props;
    return (
        <div>
            <Checkbox
                checked={value}
                label={"Yes"}
                name={`multiSelectBoxes`}
                onChange={(e) => { onChange(e.checked, id); }}
                value={value}
                className={classes.checkbox}
                dense
            />
        </div>
    )
}

export default withStyles(styles)(TrueOnly)