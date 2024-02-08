import React from 'react'
import { WithBorderProps } from '../../types/template/TemplateProps';

const borderTypes = {
    all: { border: "0.0625rem solid rgba(224, 224, 224, 1)" },
    bottom: { borderBottom: "0.0625rem solid rgba(224, 224, 224, 1)" },
    top: { borderTop: "0.0625rem solid rgba(224, 224, 224, 1)" }
}

function WithBorder(props: WithBorderProps): React.ReactElement {
    const { children, type } = props;

    return (
        <div
            data-test="workinglists-border"
            style={borderTypes[type]}
        >
            {children}
        </div>
    )
}

export default WithBorder
