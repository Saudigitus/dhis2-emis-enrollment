import React, { useState } from "react";
import { Divider, IconCheckmarkCircle16, Tag, ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import styles from "./modal.module.css";
import { type ButtonActionProps } from "../../types/buttons/ButtonActions";
import Title from "../text/Title";
import SummaryCards from "./SummaryCards";
import { Collapse } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import {ProcessingRecords, ProcessingRecordsState} from "../../schema/bulkImportSchema";
import {useRecoilValue} from "recoil";

interface ModalContentProps {
    setOpen: (value: boolean) => void
    summaryData: any
    summaryDetails?: React.ReactElement
}
const ModalSummaryContent = (props: ModalContentProps): React.ReactElement => {
    const { setOpen, summaryData, summaryDetails } = props;

    const [showDetails, setShowDetails] = useState(false)
    const processedRecords: ProcessingRecords = useRecoilValue<ProcessingRecords>(ProcessingRecordsState)
    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    const importStudents = () => {
        console.log("IMPORT TEs: ", processedRecords?.newTrackedEntities)
    }

    const modalActions: ButtonActionProps[] = [
        { label: "Dry Run", loading: false, disabled: false, onClick: () => { } },
        { label: "Import new students", primary: true, loading: false, disabled: false, onClick: () => { importStudents() } },
        { label: "Close", disabled: false, loading: false, onClick: () => { setOpen(false) } }
    ];

    return (
        <div>
            <Tag positive icon={<IconCheckmarkCircle16 />} className={styles.tagContainer}> Students import preview </Tag>

            <WithPadding />
            <Title label="Summary" />
            <WithPadding />

            <SummaryCards {...summaryData} />

            <WithPadding />
            <WithPadding />
            <ButtonStrip>
                <Button small icon={<InfoOutlined className={styles.infoIcon} />} onClick={handleShowDetails}>More details</Button>
            </ButtonStrip>

            <WithPadding />
            <Collapse in={showDetails}>
                <div className={styles.detailsContainer}>
                    {summaryDetails}
                </div>
            </Collapse>

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
