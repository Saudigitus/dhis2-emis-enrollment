import React, { useState } from 'react'
import { IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import ImportContent from '../../../modal/ImportContent';
import Tooltip from '@material-ui/core/Tooltip';
import { useGetEnrollmentForm, useParams } from '../../../../hooks';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { RowSelectionState } from '../../../../schema/tableSelectedRowsSchema';
import { useRecoilValue } from 'recoil';

function BuklUpdateStudents() {
  const [open, setOpen] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const { urlParamiters } = useParams();
  const { school, academicYear, grade } = urlParamiters()
  const { sectionName } = useGetSectionTypeLabel();
  const { enrollmentsData } = useGetEnrollmentForm();
  const selected = useRecoilValue(RowSelectionState);


  return (
    <div>
      <ButtonStrip>
        <Tooltip title={!!(school === null || academicYear === null || grade === null) ? "Please select an organisation unit, academic year and grade before" : ""}>
          <span style={{ marginRight: "20px" }} >
            <Button disabled={(school === null || academicYear === null || grade === null) || (selected?.selectedRows?.length === 0 && !selected.isAllRowsSelected)}
              onClick={() => { setOpen(true); }} icon={<IconAddCircle24 />}>Bulk Update Student</Button>
          </span>
        </Tooltip>
      </ButtonStrip>

      {open && <ModalComponent title={`Bulk Update Students`} open={open} setOpen={setOpen}>
        <ModalContentComponent
          sectionName={sectionName}
          enrollmentsData={enrollmentsData}
          setOpen={setOpen}
          bulkUpdate={true}
        />
      </ModalComponent>}
      {openImport && <ModalComponent title={`Import ${sectionName}`} open={openImport} setOpen={setOpenImport}><ImportContent setOpen={setOpen} /></ModalComponent>}
    </div>
  )
}

export default BuklUpdateStudents
