import React, {useState} from 'react';
import {DropzoneDialog} from "material-ui-dropzone";
import {CloudUpload } from "@material-ui/icons";
import {Button} from '@dhis2/ui'
import {createStyles, makeStyles, MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import {read, utils} from "xlsx";
import { type UploadTemplate} from "../../types/bulkImport/TemplateFormat";
import {processData} from "../../utils/bulkImport/processImportData";
import {fetchTEI, getProgramTEAttributeID} from "../../utils/bulkImport/fetchTEIs";
import {useRecoilValue} from "recoil";
import {ProgramConfigState, type ProgramSchemaConfig} from "../../schema/programSchema";
import {type ProgramConfig} from "../../types/programConfig/ProgramConfig";
import { useConfig } from '@dhis2/app-runtime'

interface BulkEnrollmentProps {
    onSubmit?: () => void
}
export const BulkEnrollment = ({onSubmit}: BulkEnrollmentProps): React.ReactElement => {
    const {baseUrl} = useConfig()
    const [open, setOpen] = useState(false);
    const getProgramConfigState: ProgramSchemaConfig | undefined = useRecoilValue<ProgramSchemaConfig | undefined>(ProgramConfigState)
    // const programConfing: ProgramConfig = getProgramConfigState
    // const setBulkEnrollments = useRecoilState(BulkEnrollmentsState);
    const conf = getProgramTEAttributeID(getProgramConfigState as ProgramConfig, "System ID")
    console.log(getProgramConfigState, conf)
    console.log(fetchTEI(`${baseUrl}/api/`, getProgramConfigState as ProgramConfig, "001123"))
    const useStyles = makeStyles(theme => createStyles({
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
        "grade", "class", "studentID", "firstName", "surName", "dateOfBirth",
        "sex", "nationality", "specialNeeds", "healthIssues", "practicalSkills", "talents"]
    const configHeaders: string[] = ["school", "schoolUID"]
    //
    const classes = useStyles();
    const handleFileChange = (file: any) => {
        try {
            const reader: FileReader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
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
                // setBulkEnrollments(templateData);
                // Process jsonData as needed (e.g., update form fields)
                console.log('Excel Data:', processData(templateData), templateData, conf);
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error processing Excel file:', error);
        }
    };

    // const {data: tes, loading} = useGetTEBySystemID({id: "123", orgUnit: "flPJKKJWmUP", program: "wQaiD2V27Dp"})
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
                    onSave={(files: any) => {
                        console.log('Files:', files);
                        handleFileChange(files[0])
                    }}
                    clearOnUnmount={true}
                />
            </MuiThemeProvider>
        </>
    );
}
