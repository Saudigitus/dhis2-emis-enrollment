import React from 'react'
import { WithPaddingProps } from '../../types/template/TemplateProps';

function WithPadding(props: WithPaddingProps): React.ReactElement {
    const { children, p = "0.5rem" } = props;

    return (
        <div
            style={{ padding: p }}
        >
            {children}
        </div>
    )
}

export default WithPadding
