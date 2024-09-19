import React, { useEffect, useState } from "react";
import { Divider, IconCheckmarkCircle16, Tag, ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import styles from "./modal.module.css";
import { type ButtonActionProps } from "../../types/buttons/ButtonActions";
import Title from "../text/Title";
import SummaryCards from "./SummaryCards";
import { Collapse } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import {
    BulkImportResponseStats, BulkImportResponseStatsState,
    ProcessingRecords,
    ProcessingRecordsState,
    ProcessingStage
} from "../../schema/bulkImportSchema";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { usePostTrackedEntities } from "../../hooks/bulkImport/postTrackedEntities";
import { TrackedEntity } from "../../schema/trackerSchema";
import { ApiResponse, Stats } from "../../types/bulkImport/Interfaces";
import { LinearProgress } from "@material-ui/core";
import { ProgressState } from "../../schema/linearProgress";

interface ModalContentProps {
    setOpen: (value: boolean) => void
    summaryData: any
    summaryDetails?: React.ReactElement
}

const ModalSummaryContent = (props: ModalContentProps): React.ReactElement => {
    const {
        setOpen,
        summaryData,
        summaryDetails
    } = props;

    const [showDetails, setShowDetails] = useState(false)
    const processedRecords: ProcessingRecords = useRecoilValue<ProcessingRecords>(ProcessingRecordsState)
    const [processingStage, setProcessingStage] = useRecoilState<string>(ProcessingStage)
    const [bulkImportResponseStatsState, setBulkImportResponseStatsState] = useRecoilState<BulkImportResponseStats>(BulkImportResponseStatsState)
    const resetBulkImportResponseStatsState = useResetRecoilState(BulkImportResponseStatsState)
    const {
        loading,
        postTrackedEntities,
        data,
        error
    } = usePostTrackedEntities()
    const forUpdate = processedRecords?.forUpdate as boolean
    const updateProgress = useSetRecoilState(ProgressState)

    useEffect(() => {
        if (data !== undefined) {

            const { validationReport } = data
            if (processingStage === "dry-run") {
                setBulkImportResponseStatsState({
                    ...bulkImportResponseStatsState,
                    validationReport: validationReport,
                    stats: data.stats,
                    status: data.status,
                    bundleReport: data.bundleReport
                })
            } else if (processingStage === "import") {
                const { bundleReport } = data
                // for actual import, let's count the enrollments created
                const stats: Stats = bundleReport?.typeReportMap?.ENROLLMENT?.stats as Stats
                setBulkImportResponseStatsState({
                    ...bulkImportResponseStatsState,
                    validationReport: validationReport,
                    stats: stats,
                    status: data.status,
                    bundleReport: data.bundleReport
                })
                setProcessingStage("completed")
            }
        }
    }, [data]);

    useEffect(() => {
        if (error !== undefined) {
            const importResponse: ApiResponse = error.details as unknown as ApiResponse
            setBulkImportResponseStatsState({
                ...bulkImportResponseStatsState,
                validationReport: importResponse.validationReport,
                stats: importResponse.stats,
                status: importResponse.status
            })
        }
    }, [error])
    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    const summaryTitle = processingStage === "template-processing"
        ? "Template Processing"
        : processingStage === "dry-run"
            ? "Dry Run"
            : "Import"

    const importStudents = (importMode: "VALIDATE" | "COMMIT") => {
        resetBulkImportResponseStatsState()
        updateProgress({ progress: 10, buffer: 20 })
        if (importMode === "VALIDATE") {
            setProcessingStage("dry-run")
        } else {
            setProcessingStage("import")
        }

        const params = {
            async: false,
            importMode,
            importStrategy: "CREATE_AND_UPDATE"
        }

        try {
            const teisPayload: any = {
                trackedEntities: !forUpdate
                    ? processedRecords?.newTrackedEntities as TrackedEntity[]
                    : processedRecords?.updateTrackedEntities as TrackedEntity[]
            }
            void postTrackedEntities({
                data: teisPayload,
                params
            })
        } catch (error: any) {
            console.error("Error importing Tracked Entities: ", error)
        }
    }
    const newImportDisabled = (processedRecords.newTrackedEntities?.length === 0 || processingStage === 'completed' || loading)
    const updatesDisabled = (processedRecords.updateTrackedEntities?.length === 0 || processingStage === 'completed' || loading)

    const modalActions: ButtonActionProps[] = [
        {
            label: "Dry Run",
            loading: false,
            disabled: forUpdate ? updatesDisabled : newImportDisabled,
            onClick: () => {
                importStudents("VALIDATE")
            }
        },
        {
            label: forUpdate ? "Update students" : "Import new students",
            primary: true,
            loading: false,
            disabled: forUpdate ? updatesDisabled : newImportDisabled,
            onClick: () => {
                importStudents("COMMIT")
            }
        },
        {
            label: "Close",
            disabled: loading,
            loading: false,
            onClick: () => {
                setOpen(false)
            }
        }
    ];

    return (
        <div>
            <Tag positive icon={<IconCheckmarkCircle16 />} className={styles.tagContainer}> Students import
                preview </Tag>

            <WithPadding />
            <Title label={`${summaryTitle} Summary`} />
            <WithPadding />

            <SummaryCards {...summaryData} />

            <WithPadding />
            <WithPadding />
            <ButtonStrip>
                <Button small icon={<InfoOutlined className={styles.infoIcon} />} onClick={handleShowDetails}>More
                    details</Button>
            </ButtonStrip>

            <WithPadding />
            <Collapse in={showDetails}>
                <div className={styles.detailsContainer}>
                    {summaryDetails}
                </div>
            </Collapse>

            {loading && <LinearProgress />}
            <Divider />
            <ModalActions>
                <ButtonStrip end>
                    {modalActions.map((action, i) => (
                        <Button
                            key={i}
                            {...action}
                        >
                            {action.label}
                        </Button>
                    ))}
                </ButtonStrip>
            </ModalActions>
        </div>
    );
}

export default ModalSummaryContent;
