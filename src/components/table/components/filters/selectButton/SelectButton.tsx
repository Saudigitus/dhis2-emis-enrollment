import { Popover, makeStyles } from '@material-ui/core';
import React, { useState, useRef } from 'react'
import RenderWithoutAppliedFilter from './RenderWithoutAppliedFilter';
import WithPadding from '../../../../template/WithPadding';
import SelectorContents from '../enrollment/content/SelectorContents';
import RenderWithAppliedFilter from './RenderWithAppliedFilter';

const POPOVER_ANCHOR_ORIGIN = {
    vertical: 'bottom',
    horizontal: 'left'
};

const POPOVER_TRANSFORM_ORIGIN = {
    vertical: 'top',
    horizontal: 'left'
};

interface SelectButtonProps {
    colum: any
    value: any
    onChange: any
    filled: string
    onQuerySubmit: any
    disabled: any
    disabledReset: any
    onResetFilters: any
    title: string
    tooltipContent: string
}

const useStyles = makeStyles({
    icon: {
        fontSize: 20,
        paddingLeft: 5
    },
    inactiveFilterButton: {
        backgroundColor: '#f5f5f5'
    },
    inactiveFilterButtonLabel: {
        textTransform: 'none'
    },
    button: {
        backgroundColor: 'rgb(184, 215, 243) !important'
    },
    hovered: {
        backgroundColor: 'rgb(114, 176, 231) !important'
    },
    clearIcon: {
        color: "secondary",
        '&:hover': {
            color: "primary"
        }
    }
});

function SelectButton(props: SelectButtonProps) {
    const { colum, value, onChange, filled, onQuerySubmit, disabled, disabledReset, onResetFilters, title, tooltipContent } = props;
    const classes = useStyles()

    const anchorRef = useRef(null)
    let activeFilterButtonInstance = useRef(null)
    const [selectorVisible, setselectorVisible] = useState<boolean>(false)

    const closeFilterSelector = () => {
        setselectorVisible(false);
    }

    const onClose = () => {
        onResetFilters(colum.id)
        setselectorVisible(false);
    }

    const refActiveFilterInstance = (event: any) => {
        activeFilterButtonInstance = event;
    }

    const openFilterSelector = () => {
        setselectorVisible(true);

        if (filled?.length > 0) {
            activeFilterButtonInstance.current = null
            // activeFilterButtonInstance && activeFilterButtonInstance.clearIsHovered();
        }
    }

    return (
        <div style={{ padding: "0.25em 0.5em 0.25em 0em" }}>
            <div
                data-test="filter-button-popover-anchor"
                ref={anchorRef}
            >
                {(filled?.length > 0)
                    ? <RenderWithAppliedFilter
                        classes={classes}
                        disabled={false}
                        filled={filled}
                        refActiveFilterInstance={refActiveFilterInstance}
                        onClose={onClose}
                        openFilterSelector={openFilterSelector}
                        title={title}
                        selectorVisible={selectorVisible}
                        tooltipContent={tooltipContent}
                    />
                    : <RenderWithoutAppliedFilter
                        classes={classes}
                        disabled={false}
                        openFilterSelector={openFilterSelector}
                        title={title}
                        selectorVisible={selectorVisible}
                        tooltipContent={tooltipContent}
                    />
                }
            </div>
            <Popover
                open={selectorVisible}
                anchorEl={anchorRef.current}
                onClose={closeFilterSelector}
                anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                transformOrigin={POPOVER_TRANSFORM_ORIGIN}
            >
                {
                    (() => {
                        if (selectorVisible) {
                            return (
                                <WithPadding p={"1.5rem"}>
                                    <SelectorContents
                                        colum={colum}
                                        onClose={onClose}
                                        onChange={onChange}
                                        value={value}
                                        onQuerySubmit={onQuerySubmit}
                                        disabled={disabled}
                                        disabledReset={disabledReset}
                                    />
                                </WithPadding>
                            )
                        }
                        return null;
                    })()
                }
            </Popover>
        </div>
    )
}

export default SelectButton
