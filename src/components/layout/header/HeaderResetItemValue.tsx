import React from 'react'
import styles from "./MainHeader.module.css"
import CancelIcon from '@material-ui/icons/Cancel';

export default function HeaderResetItemValue({ onReset }: any): React.ReactElement {

    return (
        <div 
            onClick={onReset}
            className={styles.headerResetItemValue}
        >
            <CancelIcon />
        </div>
    )
}