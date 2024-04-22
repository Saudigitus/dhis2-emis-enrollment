import React, {useEffect, useState} from 'react';

import {createStyles, createTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import {DropzoneDialog} from "material-ui-dropzone";
import {CloudUpload} from "@material-ui/icons";
import {read, utils} from "xlsx";
import {useGetUsedPProgramStages, useShowAlerts} from "../../hooks";
import {ProgramConfigState} from "../../schema/programSchema";
import {ProgramConfig} from "../../types/programConfig/ProgramConfig";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {useGetEnrollmentStages} from "../../hooks/bulkImport/useGetEnrollmentStages";
import {fieldsMap, fromPairs, validateTemplate} from "../../utils/bulkImport/validateTemplate";
import {
    createTrackedEntityPayload,
    generateData,
    getMandatoryFields,
    processData
} from "../../utils/bulkImport/processImportData";
import {useDataEngine} from "@dhis2/app-runtime";
import {Center, Modal, ModalContent, ModalTitle} from "@dhis2/ui";
import {CircularProgress} from "@material-ui/core";
import ModalSummaryContent from "./ModalSummaryContent";
import SummaryDetails from "./SummaryDetails";
import {
    BulkImportStats,
    BulkImportStatsState,
    Headings,
    ProcessingRecords,
    ProcessingRecordsState, ProcessingStage, TemplateHeadingsState
} from "../../schema/bulkImportSchema";

interface BulkEnrollmentProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}

export const BulkEnrollment = ({setOpen, isOpen}: BulkEnrollmentProps): React.ReactElement => {
    const programConfig: ProgramConfig = useRecoilValue<ProgramConfig>(ProgramConfigState)
    console.log(programConfig)
    const engine = useDataEngine()
    const [isProcessing, setIsProcessing] = useState(false);
    const [summaryOpen, setSummaryOpen] = useState(false);
    const performanceStages = useGetUsedPProgramStages();
    const enrollmentStages = useGetEnrollmentStages();
    const {hide, show} = useShowAlerts()
    const [uploadStats, setUploadStats] = useRecoilState<BulkImportStats>(BulkImportStatsState);
    const [_excelTemplateHeaders, setExcelTemplateHeaders] = useRecoilState<Headings>(TemplateHeadingsState)
    const [_processedRecords, setProcessedRecords] = useRecoilState<ProcessingRecords>(ProcessingRecordsState);
    const resetProcessingStage = useResetRecoilState(ProcessingStage);
    const [isValidTemplate, setIsValidTemplate] = useState(false)

    const useStyles = makeStyles(() => createStyles({
        previewChip: {
            minWidth: 160,
            maxWidth: 210
        }
    }));
    const theme = createTheme({
        overrides: {}
    });

    const resetUploadStats = () => {
        console.log("resting stats")
        setUploadStats({
            teis: {
                created: 0,
                updated: 0,
                ignored: 0,
                deleted: 0,
                total: 0,
                conflicts: 0,
                invalid: 0
            }
        })
    }

    const classes = useStyles();
    const handleFileChange = (file: File) => {
        resetProcessingStage()
        resetUploadStats()
        setIsProcessing(true)
        setSummaryOpen(true)
        const reader: FileReader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            const data: Uint8Array = new Uint8Array(e.target?.result as any);
            const workbook = read(data, {
                type: 'array',
                cellDates: true,
                cellNF: false,
                dateNF: "YYYY-MM-DD",
                cellText: true
            });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rawData = utils.sheet_to_json(worksheet,
                {header: 1, raw: false, dateNF: 'yyyy-mm-dd', defval: ""});
            const configSheet = workbook.SheetNames[1];
            const configWorksheet = workbook.Sheets[configSheet];
            const configData = utils.sheet_to_json(configWorksheet);

            console.log(rawData.slice(0, 3))
            const validationMessage: string = validateTemplate(
                rawData, configData, programConfig, enrollmentStages)
            if (validationMessage.length > 1) {
                show({
                    message: validationMessage,
                    type: {critical: true}
                })
                setOpen(false)
                setTimeout(hide, 2000)
                return
            }
            setIsValidTemplate(true)
            const headings: string[] = rawData[0] as string[] // headings seen by user
            const headers: string[] = rawData[1] as string[] // hidden header in template
            const templateHeadings = fromPairs(headers.map((val, idx) => {
                return [val, headings[idx] ?? ""]
            }))
            setExcelTemplateHeaders(templateHeadings)
            console.log("templateHeadings", templateHeadings)
            const dataWithHeaders: Array<Record<string, any>> = generateData(headers, rawData.slice(2))
            const fieldMapping = fieldsMap(programConfig, enrollmentStages)
            // console.log("<<<<<<", fieldMapping)
            const [invalidRecords, validRecords, newRecords, recordsToUpdate] = await processData(
                dataWithHeaders, fieldMapping, programConfig, engine)
            console.log("INVALID RECORDS:", invalidRecords)
            console.log("VALID RECORDS:", validRecords)
            console.log("NEW RECORDS", newRecords)
            console.log("TO UPDATE", recordsToUpdate)

            setUploadStats(stats => ({
                ...stats,
                teis: {
                    ...stats.teis,
                    invalid: invalidRecords.length,
                    created: newRecords.length,
                    duplicates: recordsToUpdate.length,
                    updated: recordsToUpdate.length,
                    conflicts: 0
                }
            }))
            // console.log("UPLOAD STATS ======>", uploadStats)
            // create new tracked entity payloads for non-existing records
            const newTrackedEntities = createTrackedEntityPayload(
                newRecords, fieldMapping, programConfig, enrollmentStages, performanceStages)
            // create update tracked entity payloads for existing records
            const updateTrackedEntities = createTrackedEntityPayload(
                recordsToUpdate, fieldMapping, programConfig, enrollmentStages, performanceStages, true)
            console.log("trackedEntities: NEW=>", newTrackedEntities.slice(0, 1), "UPDATE=>", updateTrackedEntities.slice(0, 2))
            const mandatoryFields = getMandatoryFields(fieldMapping)
            // update ProcessedRecords state variable for reference in summaries and more actions
            setProcessedRecords((r) => ({
                ...r,
                validRecords,
                invalidRecords,
                newRecords,
                recordsToUpdate,
                mandatoryFields,
                newTrackedEntities,
                updateTrackedEntities

            }))

            setIsProcessing(false)
        };
        reader.readAsArrayBuffer(file);
    }
    const onSave = (files: File[]) => {
        // setOpen(false);
        handleFileChange(files[0])
    }
    return (
        <>
            {((!isProcessing && !summaryOpen) || !isValidTemplate) &&
                <MuiThemeProvider theme={theme}>
                    <DropzoneDialog
                        dialogTitle={"Bulk Enrollment"}
                        submitButtonText={"Start Import"}
                        dropzoneText={"Drag and drop a file here or Browse"}
                        Icon={CloudUpload as any}
                        filesLimit={1}
                        showPreviews={false}
                        showPreviewsInDropzone={true}
                        previewGridProps={{
                            container: {
                                spacing: 1,
                                direction: 'row'
                            }
                        }}
                        previewChipProps={{classes: {root: classes.previewChip}}}
                        previewText="Selected file:"
                        showFileNames={true}
                        showFileNamesInPreview={true}
                        acceptedFiles={[".xlsx"]}
                        open={isOpen}
                        onClose={() => {
                            setOpen(false)
                        }}
                        onSave={onSave}
                        clearOnUnmount={true}
                    />
                </MuiThemeProvider>
            }
            {(summaryOpen && isValidTemplate) &&
                <Modal fluid>
                    <ModalTitle>{isProcessing ? "Processing Bulk Enrolment" : "Bulk Enrolment Summary"}</ModalTitle>
                    <ModalContent>
                        {isProcessing
                            ? <Center><CircularProgress/></Center>
                            : <ModalSummaryContent
                                setOpen={setSummaryOpen}
                                summaryData={
                                    {
                                        updated: uploadStats.teis.updated,
                                        created: uploadStats.teis.created,
                                        conflicts: uploadStats.teis.conflicts,
                                        duplicates: uploadStats.teis.updated,
                                        invalid: uploadStats.teis.invalid
                                    }
                                    // {updated: 0, created: 0, conflicts:0, duplicates: 0, invalid: 0}
                                }
                                summaryDetails={
                                    <>
                                        <SummaryDetails/>
                                    </>
                                }
                            />
                        }
                    </ModalContent>

                </Modal>}
        </>
    );
}
