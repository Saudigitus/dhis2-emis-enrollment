import React from 'react'
import WithPadding from '../../../../template/WithPadding'
import EnrollmentActionsButtons from '../../enrollmentButtons/EnrollmentActionsButtons';
import BuklUpdateStudents from '../../bulkUpdateStudent/EnrollmentActionsButtons';
import styles from './workingLists.module.css'

function WorkingLists() {
  return (
    <WithPadding>
      <div className='d-flex justify-content-between'>
        <div />
        <div className={styles.container} >
          <BuklUpdateStudents />
          <EnrollmentActionsButtons />
        </div>
      </div>
    </WithPadding >
  )
}

export default WorkingLists
