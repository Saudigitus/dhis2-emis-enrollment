import React, {useState} from 'react';
import {DropzoneDialog} from "material-ui-dropzone";
import {CloudUpload } from "@material-ui/icons";
import {Button} from '@dhis2/ui'
import {createStyles, makeStyles, MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import {read, utils} from "xlsx";
import { type UploadTemplate} from "../../types/bulkImport/TemplateFormat";
import {processData} from "../../utils/bulkImport/processImportData";
import {useRecoilValue} from "recoil";
import {ProgramConfigState, type ProgramSchemaConfig} from "../../schema/programSchema";
import {type ProgramConfig} from "../../types/programConfig/ProgramConfig";
import { useConfig } from '@dhis2/app-runtime'
import {type AttributeAlias, TEAttributeAliasState} from "../../schema/importSchema";
import {type TrackedEntity} from "../../schema/trackerSchema";
import {usePostTei} from "../../hooks/bulkImport/postTEs";

export const BulkEnrollment = (): React.ReactElement => {
    const {baseUrl} = useConfig()
    const [open, setOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const getProgramConfigState: ProgramSchemaConfig | undefined = useRecoilValue<ProgramSchemaConfig | undefined>(ProgramConfigState)
    const attributeAliasState: AttributeAlias = useRecoilValue<AttributeAlias>(TEAttributeAliasState)
    const { postTei} = usePostTei()
    // const [numberOfImportRecords, setNumberOffImportRecords] = useState<number>(0);
    // const setBulkEnrollments = useRecoilState(BulkEnrollmentsState);
    const useStyles = makeStyles(() => createStyles({
        previewChip: {
            minWidth: 160,
            maxWidth: 210
        }
    }));
    const theme = createTheme({
        overrides: {
        }
    })
    const templateHeaders: string[] = [
        "#", "schoolName", "schoolUID", "enrollmentDate", "academicYear",
        "grade", "studentClass", "studentID", "firstName", "surName", "dateOfBirth",
        "sex", "nationality", "specialNeeds", "healthIssues", "practicalSkills", "talents"]
    const configHeaders: string[] = ["school", "schoolUID"]
    //
    const classes = useStyles();
    const handleFileChange = (file: any) => {
        setIsProcessing(true)
        console.log("Processing:", isProcessing)
        try {
            const reader: FileReader = new FileReader();
            reader.onload = async(e: ProgressEvent<FileReader>) => {
                const data: Uint8Array = new Uint8Array(e.target?.result as any);
                const workbook = read(data, {
                    type: 'array',
                    cellDates: true,
                    cellNF: false,
                    cellText: true
                });

                // Assuming you have a sheet named 'Sheet1'
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = utils.sheet_to_json(worksheet, { header: templateHeaders });
                const configSheet = workbook.SheetNames[1];
                const configWorksheet = workbook.Sheets[configSheet];
                const configData = utils.sheet_to_json(configWorksheet, {header: configHeaders});
                const templateData: UploadTemplate = {Enrollments: jsonData, Config: configData}
                // setNumberOffImportRecords(templateData.Enrollments.length - 1)
                // setBulkEnrollments(templateData);
                // Process jsonData as needed (e.g., update form fields)
                const processedData = await processData(templateData,
                    getProgramConfigState as ProgramConfig, attributeAliasState, baseUrl)
                const chunkSize = 250
                for (let i: number = 0; i < processedData.length; i = i + chunkSize) {
                    const teis: TrackedEntity[] = processedData.slice(i, i + chunkSize)
                    const teisPayload: any = {
                        trackedEntities: teis
                    }
                    void postTei({data: teisPayload})
                    console.log('Excel Slice Data:', teisPayload);
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error processing Excel file:', error);
        }
        setIsProcessing(false)
    };
    const onSave = (files: any) => {
        console.log('Files:', files);
        handleFileChange(files[0])
        // setBulkEnrollments({Enrollments: [], Config: []})
        // setOpen(false);
    }

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => { setOpen(true) }}>
                Bulk Import
            </Button>
            <MuiThemeProvider theme={theme}>
                <DropzoneDialog
                    dialogTitle={"Bulk Enrollment"}
                    submitButtonText={"Import"}
                    dropzoneText={"Drag and drop a file here or Browse"}
                    Icon={ CloudUpload as any }
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
                    open={open}
                    onClose={() => { setOpen(false) }}
                    onSave={onSave }
                    clearOnUnmount={true}
                />
            </MuiThemeProvider>
        </>
    );
}
