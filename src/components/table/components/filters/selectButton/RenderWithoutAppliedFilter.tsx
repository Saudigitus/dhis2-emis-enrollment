import React from 'react'
import { Button, IconChevronDown16, IconChevronUp16, Tooltip } from '@dhis2/ui';

interface RenderWithoutAppliedFilterProps {
    selectorVisible: boolean
    classes: any
    title: string
    disabled: boolean
    tooltipContent: string
    openFilterSelector: () => void
}

interface TooltipProps {
    onMouseOver: () => void
    onMouseOut: () => void
    ref: any
}

function RenderWithoutAppliedFilter(props: RenderWithoutAppliedFilterProps): React.ReactElement {
    const { selectorVisible, classes, title, disabled, tooltipContent, openFilterSelector } = props;

    return disabled
        ? (
            <Tooltip content={tooltipContent} closeDelay={50}>
                {({ onMouseOver, onMouseOut, ref }: TooltipProps) => (
                    <div
                        ref={(divRef) => {
                            if ((divRef != null) && disabled) {
                                divRef.onmouseover = onMouseOver;
                                divRef.onmouseout = onMouseOut;
                                ref.current = divRef;
                            }
                        }}
                    >
                        <Button disabled={disabled}>
                            {title}
                            <span className={classes.icon}>
                                {selectorVisible ? <IconChevronUp16 /> : <IconChevronDown16 />}
                            </span>
                        </Button>
                    </div>
                )}
            </Tooltip>
        )
        : (
            <Button onClick={openFilterSelector}>
                {title}
                <span className={classes.icon}>
                    {selectorVisible ? <IconChevronUp16 /> : <IconChevronDown16 />}
                </span>
            </Button>
        );
}

export default RenderWithoutAppliedFilter
