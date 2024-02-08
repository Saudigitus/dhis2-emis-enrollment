import React from 'react'
import ContentFilter from './ContentFilter';
import styles from './EnrollmentFilter.module.css'
import { useHeader } from '../../../../../hooks';

function EnrollmentFilters(): React.ReactElement {
    const { columns } = useHeader()
    return (
        <div className={styles.container}>
            <ContentFilter headers={columns} />
        </div>
    )
}

export default EnrollmentFilters
