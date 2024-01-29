import React from 'react'
import ContentFilter from './ContentFilter';
import { useHeader } from '../../../../../hooks/tableHeader/useHeader';
import styles from './EnrollmentFilter.module.css'

function EnrollmentFilters(): React.ReactElement {
    const { columns } = useHeader()
    return (
        <div className={styles.container}>
            <ContentFilter headers={columns} />
        </div>
    )
}

export default EnrollmentFilters
