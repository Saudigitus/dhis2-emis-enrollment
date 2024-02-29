import React from 'react';

import {createStyles, createTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import {DropzoneDialog} from "material-ui-dropzone";
import {CloudUpload} from "@material-ui/icons";
import {read, utils} from "xlsx";
import {useGetUsedPProgramStages, useShowAlerts} from "../../hooks";
import {ProgramConfigState} from "../../schema/programSchema";
import {ProgramConfig} from "../../types/programConfig/ProgramConfig";
import {useRecoilValue} from "recoil";
import {useGetEnrollmentStages} from "../../hooks/bulkImport/useGetEnrollmentStages";
import {fieldsMap, validateTemplate} from "../../utils/bulkImport/validateTemplate";
import {createTrackedEntityPayload, generateData, processData} from "../../utils/bulkImport/processImportData";
import {useDataEngine} from "@dhis2/app-runtime";

interface BulkEnrollmentProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}

export const BulkEnrollment = ({setOpen, isOpen}: BulkEnrollmentProps): React.ReactElement => {
    const programConfig: ProgramConfig = useRecoilValue<ProgramConfig>(ProgramConfigState)
    console.log(programConfig)
    const engine = useDataEngine()
    const performanceStages = useGetUsedPProgramStages();
    const enrollmentStages = useGetEnrollmentStages();
    const {hide, show} = useShowAlerts()
    const useStyles = makeStyles(() => createStyles({
        previewChip: {
            minWidth: 160,
            maxWidth: 210
        }
    }));
    const theme = createTheme({
        overrides: {}
    });
    const classes = useStyles();
    const handleFileChange = (file: File) => {
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
                setTimeout(hide, 3000)
                return
            }
            const headers: string[] = rawData[1] as string[]
            const dataWithHeaders: Array<Record<string, any>> = generateData(headers, rawData.slice(2))
            const fieldMapping = fieldsMap(programConfig, enrollmentStages)
            // console.log("<<<<<<", fieldMapping)
            const [invalidRecords, validRecords, newRecords, recordsToUpdate] = await processData(
                dataWithHeaders, fieldMapping, programConfig, engine)
            console.log(invalidRecords, validRecords, newRecords, recordsToUpdate)
            const trackedEntities = createTrackedEntityPayload(newRecords, fieldMapping, programConfig, enrollmentStages, performanceStages)
            console.log("trackedEntities=>", trackedEntities.slice(0, 1))
        };
        reader.readAsArrayBuffer(file);
    }
    const onSave = (files: File[]) => {
        setOpen(false);
        handleFileChange(files[0])
    }
    return (
        <>
            <MuiThemeProvider theme={theme}>
                <DropzoneDialog
                    dialogTitle={"Bulk Enrollment"}
                    submitButtonText={"Import"}
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
        </>
    );
}
