import React, {useEffect, useState} from "react";
import {Divider, IconCheckmarkCircle16, Tag, ModalActions, Button, ButtonStrip} from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import styles from "./modal.module.css";
import {type ButtonActionProps} from "../../types/buttons/ButtonActions";
import Title from "../text/Title";
import SummaryCards from "./SummaryCards";
import {Collapse} from "@material-ui/core";
import {InfoOutlined} from "@material-ui/icons";
import {ProcessingRecords, ProcessingRecordsState} from "../../schema/bulkImportSchema";
import {useRecoilValue} from "recoil";
import {usePostTrackedEntities} from "../../hooks/bulkImport/postTrackedEntities";

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
    const {
        postTrackedEntities,
        data
    } = usePostTrackedEntities()

    useEffect(() => {
        console.log("Posting Data....", data)
    }, [data]);
    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    const importStudents = (importMode: string) => {
        console.log("IMPORT TEs: ", processedRecords?.newTrackedEntities, importMode)
        const params = {
            async: false,
            importMode
        }
        try {
            const teisPayload: any = {
                trackedEntities: processedRecords?.newTrackedEntities
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
            <Title label="Summary"/>
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
