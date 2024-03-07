import React, {useEffect, useState} from "react";
import {Divider, IconCheckmarkCircle16, Tag, ModalActions, Button, ButtonStrip} from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import styles from "./modal.module.css";
import {type ButtonActionProps} from "../../types/buttons/ButtonActions";
import Title from "../text/Title";
import SummaryCards from "./SummaryCards";
import {Collapse} from "@material-ui/core";
import {InfoOutlined} from "@material-ui/icons";
import {ProcessingRecords, ProcessingRecordsState, ProcessingStage} from "../../schema/bulkImportSchema";
import {useRecoilState, useRecoilValue} from "recoil";
import {usePostTrackedEntities} from "../../hooks/bulkImport/postTrackedEntities";
import {TrackedEntity} from "../../schema/trackerSchema";

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
    const {
        postTrackedEntities,
        data
    } = usePostTrackedEntities()

    useEffect(() => {
        console.log("Posting Data....", data)
    }, [data]);
    useEffect(() => {
    },[processingStage])
    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    const summaryTitle = processingStage === "template-processing"
        ? "Template Processing" : processingStage === "dry-run"
            ? "Dry Run": "Import"

    const importStudents = (importMode: "VALIDATE" | "COMMIT") => {
        if (importMode === "VALIDATE") {
            setProcessingStage("dry-run")
        } else {
            setProcessingStage("commit")
        }
        console.log("IMPORT TEs: ", processedRecords?.newTrackedEntities, importMode, processingStage)
        const params = {
            async: false,
            importMode
        }
        try {
            const teisPayload: any = {
                trackedEntities: processedRecords?.newTrackedEntities as TrackedEntity[]
            }
            void postTrackedEntities({
                data: teisPayload,
                params
            })

        } catch (error: any) {
            console.error("Error importing Tracked Entities: ", error)
        }
    }
    const newImportDisabled = processedRecords.newTrackedEntities?.length === 0

    const modalActions: ButtonActionProps[] = [
        {
            label: "Dry Run",
            loading: false,
            disabled: newImportDisabled,
            onClick: () => {
                importStudents("VALIDATE")
            }
        },
        {
            label: "Import new students",
            primary: true,
            loading: false,
            disabled: newImportDisabled,
            onClick: () => {
                importStudents("COMMIT")
            }
        },
        {
            label: "Close",
            disabled: false,
            loading: false,
            onClick: () => {
                setOpen(false)
            }
        }
    ];

    return (
        <div>
            <Tag positive icon={<IconCheckmarkCircle16/>} className={styles.tagContainer}> Students import
                preview </Tag>

            <WithPadding/>
            <Title label={`${summaryTitle} Summary`}/>
            <WithPadding/>

            <SummaryCards {...summaryData} />

            <WithPadding/>
            <WithPadding/>
            <ButtonStrip>
                <Button small icon={<InfoOutlined className={styles.infoIcon}/>} onClick={handleShowDetails}>More
                    details</Button>
            </ButtonStrip>

            <WithPadding/>
            <Collapse in={showDetails}>
                <div className={styles.detailsContainer}>
                    {summaryDetails}
                </div>
            </Collapse>

            <Divider/>
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
