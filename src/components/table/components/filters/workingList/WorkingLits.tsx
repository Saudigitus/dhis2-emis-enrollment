import React from 'react'
import WithPadding from '../../../../template/WithPadding'
import { Chip } from "@dhis2/ui";
import EnrollmentActionsButtons from '../../enrollmentButtons/EnrollmentActionsButtons';

function WorkingLits() {
  return (
    <WithPadding>
      <div className='d-flex justify-content-between'>
        <div>
          <Chip>
            Active enrollments
          </Chip>
          <Chip>
            Completed enrollments
          </Chip>
          <Chip>
            Cancelled enrollments
          </Chip>
        </div>

        <EnrollmentActionsButtons/>
      </div>
    </WithPadding>
  )
}

export default WorkingLits
