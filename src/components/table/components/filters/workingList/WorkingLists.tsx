import React from 'react'
import WithPadding from '../../../../template/WithPadding'
import EnrollmentActionsButtons from '../../enrollmentButtons/EnrollmentActionsButtons';
import BuklUpdateStudents from '../../bulkUpdateStudent/EnrollmentActionsButtons';
import styles from './workingLists.module.css'

function WorkingLists() {
  return (
    <div className={styles.workingListsContainer}>
      <BuklUpdateStudents />
      <EnrollmentActionsButtons />
    </div >
  )
}

export default WorkingLists
