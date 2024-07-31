import React from 'react'
import { Paper } from '@material-ui/core'
import styles from "./infoPage.module.css"

export default function InfoPage() {
    return (
        <div className={styles.containerInit}>
            <Paper elevation={1} className={styles.paperInit}>
                <h2>SEMIS-Enrollment</h2>
                <span>Follow the instructions to proceed:</span>
                <ul>
                    <li className={styles.paperOtherText}>Select the  Organization unit you want to view data.</li>
                    <li className={styles.paperOtherText}>Use global filters(Class, Grade and Academic Year).</li>
                </ul>
            </Paper>
        </div>
    )
}
