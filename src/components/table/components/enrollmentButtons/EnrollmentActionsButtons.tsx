import React, { useState } from 'react'
import {
    IconAddCircle24,
    Button,
    ButtonStrip,
    IconUserGroup16,
    IconSearch24,
    CircularLoader,
    CenteredContent
} from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import Tooltip from '@material-ui/core/Tooltip';
import { useGetEnrollmentForm, useParams } from '../../../../hooks';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';
import { FlyoutOptionsProps } from "../../../../types/buttons/FlyoutOptionsProps";
import { BulkEnrollment } from "../../../bulkImport/BulkEnrollment";
import DropdownButtonComponent from "../../../buttons/DropdownButton";
import { ModalExportTemplateContent, ModalSearchEnrollmentContent } from '../../../modal';
import { getDataStoreKeys } from '../../../../utils/commons/dataStore/getDataStoreKeys';
import styles from './enrollmentActionsButtons.module.css'
import useExportTemplate from "../../../../hooks/exportTemplate/useExportTemplate";
import { useExportTemplateProps } from "../../../../types/modal/ModalProps";
import { useRecoilValue } from "recoil";
import { TableDataLengthState } from "../../../../schema/tableDataLengthSchema";
import { TableDataLoadingState } from "../../../../schema/tableDataLoadingSchema";

function EnrollmentActionsButtons() {
    const [open, setOpen] = useState<boolean>(false);
    const [openExportEmptyTemplate, setOpenExportEmptyTemplate] = useState<boolean>(false);
    const [openSearchEnrollment, setOpenSearchEnrollment] = useState<boolean>(false);
    const [openImport, setOpenImport] = useState<boolean>(false);
    const [forUpdate, setForUpdate] = useState<boolean>(false);
    const {
        useQuery,
        urlParamiters
    } = useParams();
    const { allowSearching } = getDataStoreKeys();
    const orgUnit = useQuery().get("school")
    const {
        schoolName: orgUnitName,
        academicYear
    } = urlParamiters();
    const { sectionName } = useGetSectionTypeLabel();
    const { enrollmentsData } = useGetEnrollmentForm();
    const { handleExportToWord } = useExportTemplate()
    const [loadingExport, setLoadingExport] = useState(false)
    const tableDataLength = useRecoilValue(TableDataLengthState)
    const tableDataLoading = useRecoilValue(TableDataLoadingState)
    const enrollmentOptions: FlyoutOptionsProps[] = [
        {
            label: `Enroll new ${sectionName}s`,
            divider: true,
            onClick: () => {
                setForUpdate(false);
                setOpenImport(true);
            }
        },
        {
            label: `Update existing ${sectionName}s`,
            divider: true,
            onClick: () => {
                setForUpdate(true);
                setOpenImport(true);
            }
        },
        {
            label: "Export empty template",
            divider: false,
            onClick: () => {
                setOpenExportEmptyTemplate(true)
            }
        },
        {
            label: "Export existing students",
            divider: false,
            disabled: tableDataLength === 0 || tableDataLoading,
            onClick: () => {
                const vals: useExportTemplateProps = {
                    academicYearId: academicYear ?? new Date().getFullYear().toString(),
                    orgUnit: orgUnit ?? "",
                    orgUnitName: orgUnitName ?? "",
                    studentsNumber: "0" ?? "0",
                    setLoadingExport
                }
                handleExportToWord(vals, false).finally(() => {
                });
            }
        }
    ];

    return (
        <div className={styles.container}>
            <ButtonStrip className={styles.work_buttons}>
                {allowSearching
                    ? <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
                        <span>
                            <Button disabled={orgUnit == null} onClick={() => {
                                setOpenSearchEnrollment(true);
                            }} icon={<IconSearch24 />}>
                                <span className={styles.work_buttons_text}>Search {sectionName.toLowerCase()}</span>
                            </Button>
                        </span>
                    </Tooltip>
                    : null
                }
                <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
                    <span>
                        <Button disabled={orgUnit == null} onClick={() => {
                            setOpen(true);
                        }} icon={<IconAddCircle24 />}>
                            <span className={styles.work_buttons_text}>Enroll {sectionName.toLocaleLowerCase()}</span>
                        </Button>
                    </span>
                </Tooltip>
                <DropdownButtonComponent
                    name={<span className={styles.work_buttons_text}>Bulk enrollment</span> as unknown as string}
                    disabled={false}
                    icon={<IconUserGroup16 />}
                    options={enrollmentOptions}
                />
            </ButtonStrip>

            {open && <ModalComponent title={`Single ${sectionName} Enrollment`} open={open} setOpen={setOpen}>
                <ModalContentComponent
                    sectionName={sectionName}
                    enrollmentsData={enrollmentsData}
                    setOpen={setOpen}
                />
            </ModalComponent>}

            {openImport && <ModalComponent title={Boolean(!forUpdate) ? `Bulk Enrollment` : `Bulk Enrollment Update`} open={openImport} setOpen={setOpenImport}>
                <BulkEnrollment setOpen={setOpenImport} isOpen={openImport} forUpdate={forUpdate} />
            </ModalComponent>}

            {openExportEmptyTemplate &&
                <ModalComponent title={`Data Import Template Export`} open={openExportEmptyTemplate}
                    setOpen={setOpenExportEmptyTemplate}>
                    <ModalExportTemplateContent
                        sectionName={sectionName}
                        setOpen={setOpenExportEmptyTemplate}
                    />
                </ModalComponent>}

            {openSearchEnrollment &&
                <ModalComponent title={`Search for enrolled ${sectionName.toLowerCase()}`} open={openSearchEnrollment}
                    setOpen={setOpenSearchEnrollment}>
                    <ModalSearchEnrollmentContent
                        sectionName={sectionName}
                        setOpen={setOpenSearchEnrollment}
                        setOpenNewEnrollment={setOpen}
                    />
                </ModalComponent>}

            {loadingExport &&
                <ModalComponent title={`Exporting existing ${sectionName.toLowerCase()}s`} open={loadingExport}
                    setOpen={setLoadingExport}>
                    <CenteredContent className="p-5"><CircularLoader /></CenteredContent>
                </ModalComponent>}
        </div>
    )
}

export default EnrollmentActionsButtons
