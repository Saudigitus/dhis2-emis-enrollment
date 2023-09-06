import { Paper } from '@material-ui/core'
import React from 'react'
import styles from "./infoPage.module.css"

export default function InfoPage() {
    return (
        <div className={styles.containerInit}>
            <Paper elevation={1} className={styles.paperInit}>
                <h2>SEMIS-Enrollment-Staff</h2>
                <span>Follow the instructions to proceed:</span>
                <ul>
                    <li className={styles.paperOtherText}>Select the  Organization unit you want to view data</li>
                    <li className={styles.paperOtherText}>Use global filters(Class, Grade and Academic Year)</li>
                </ul>
                {/* <span>How to perform operations:</span>
                <ul>
                    <li className={styles.paperOtherText}><strong>View last 5 events:</strong> select the date that you want.</li>
                    <li className={styles.paperOtherText}><strong>Add new event:</strong> select the date that you want and fill the fields.</li>
                </ul> */}
            </Paper>
        </div>
    )
}
