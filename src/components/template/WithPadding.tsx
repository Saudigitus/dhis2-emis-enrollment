import React from 'react'

function WithPadding(props: { children?: React.ReactNode, p?: string }): React.ReactElement {
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
