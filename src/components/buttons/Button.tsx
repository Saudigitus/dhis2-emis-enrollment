import React from 'react';
import { Button } from '@dhis2/ui';
import style from './button.module.css';
import { getTypesOfButton } from '../../utils/commons/getTypesButtons';
import { ButtonProps } from '../../types/buttons/ButtonProps';

function ButtonComponent(props: ButtonProps): React.ReactElement {

    return (
        <Button
            className={style[getTypesOfButton(props) as keyof typeof style]}
            {...props}
            type={props.type}
        >
            {props.label}
        </Button>
    );
}

export default ButtonComponent;