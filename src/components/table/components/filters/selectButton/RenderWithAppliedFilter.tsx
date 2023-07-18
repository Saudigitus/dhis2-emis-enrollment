import React from 'react'
import { IconChevronDown16, IconChevronUp16 } from '@dhis2/ui';
import ActiveFilterButton from './ActiveFilterButton';

interface RenderWithAppliedFilterProps {
    selectorVisible: boolean
    classes: any
    title: string
    disabled: boolean
    tooltipContent: string
    refActiveFilterInstance: (instance: HTMLDivElement | null) => void
    openFilterSelector: () => void
    onClose: () => void
    filled: string
}

function RenderWithAppliedFilter(props: RenderWithAppliedFilterProps): React.ReactElement {
    const { selectorVisible, classes, title, refActiveFilterInstance, openFilterSelector, onClose, filled } = props;

    const arrowIconElement = selectorVisible
        ? (
            <span className={classes.icon}>
                <IconChevronUp16 />
            </span>
        )
        : (
            <span className={classes.icon}>
                <IconChevronDown16 />
            </span>
        );

    return (
        <ActiveFilterButton
            innerRef={refActiveFilterInstance}
            onChange={openFilterSelector}
            onClear={onClose}
            iconClass={classes.icon}
            title={title}
            arrowIconElement={arrowIconElement}
            buttonText={filled}
        />
    );
}

export default RenderWithAppliedFilter
