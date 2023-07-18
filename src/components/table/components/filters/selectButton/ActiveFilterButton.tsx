import { Button, Tooltip } from '@dhis2/ui'
import createSvgIcon from '@material-ui/icons/utils/createSvgIcon';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useState } from 'react'

const ClearIcon = createSvgIcon(
    <React.Fragment>
        <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </React.Fragment>,
    'CloseCircle'
);

const useStyles = makeStyles(() => ({
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
}));

interface ActiveFilterButtonProps {
    onChange: () => void
    iconClass: any
    title: string
    arrowIconElement: React.ReactElement
    buttonText: string
    onClear: () => void
    innerRef: (instance: HTMLDivElement | null) => void
}

const MAX_LENGTH_OF_VALUE = 10;
function ActiveFilterButton(props: ActiveFilterButtonProps) {
    const { onChange, iconClass, title, arrowIconElement, buttonText, onClear, innerRef } = props
    const classes = useStyles()
    const [isHovered, setisHovered] = useState(false)

    const buttonClasses = classNames(classes.button, { [classes.hovered]: isHovered });

    const setIsHovered = () => {
        setisHovered(true);
    }

    const clearIsHovered = () => {
        setisHovered(false);
    }

    const handleClearClick = () => {
        onClear();
    }

    const getCappedValue = (value: string) => {
        const cappedValue = value.substring(0, MAX_LENGTH_OF_VALUE - 3).trimEnd();
        return `${cappedValue}...`;
    }

    const getViewValueForFilter = (buttonText: string) => {
        const calculatedValue = buttonText.length > MAX_LENGTH_OF_VALUE ? getCappedValue(buttonText) : buttonText;
        return `: ${calculatedValue}`;
    }

    return (
        <div
            onMouseEnter={setIsHovered}
            onMouseLeave={clearIsHovered}
            ref={innerRef}
        >
            <Button
                className={buttonClasses}
                onClick={onChange}
            >
                {title}
                {getViewValueForFilter(buttonText)}
                {arrowIconElement}
                <Tooltip
                    content={('Clear')}
                    placement={'bottom'}
                    openDelay={300}
                >
                    <ClearIcon
                        onMouseEnter={clearIsHovered}
                        onMouseLeave={setIsHovered}
                        className={classNames(iconClass, classes.clearIcon)}
                        onClick={handleClearClick}
                    />
                </Tooltip>
            </Button>
        </div>
    )
}

export default ActiveFilterButton
