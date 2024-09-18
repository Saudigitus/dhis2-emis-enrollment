import "./dropzone.css"
import Lottie from "lottie-react";
import { Form } from "react-final-form";
import React, { useState, useRef, useEffect } from "react";
import  uploadcloud  from "../../assets/images/bulkImport/uploadcloud.json"
import Excel from "../../assets/images/bulkImport/excel.svg"
import { ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import FileInput from "../genericFields/fields/FileInput";
import classNames from "classnames";

function DropZone(props: any) {
    const { onSave } = props;
    const [uploadedFile, setUploadedFile] = useState<any>('');
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const inputFiles = document.querySelectorAll(".dropzone_area input[type='file']");
    const inputElement: any = inputFiles[0];
    const dropZoneElement: any = inputElement?.closest(".dropzone_area");

    useEffect(() => {
        if (uploadedFile === undefined) {
            let dropzoneFileMessage = dropZoneElement?.querySelector(".file-info");
            dropzoneFileMessage.innerHTML = `No files selected`;
        }
    }, [uploadedFile]);

    function onSubmit() {
        onSave([uploadedFile])
    }

    function onChange(): void {
        if (inputElement?.files.length) {
            let dropzoneFileMessage = dropZoneElement.querySelector(".file-info");
            dropzoneFileMessage.innerHTML = `${inputElement?.files[0].name}`;
        }
    }

    function hanldeCancel() {
        setUploadedFile(undefined);
    }

    const modalActions = [
        { id: "cancel", type: "reset", label: "Cancel", disabled: false, onClick: () => hanldeCancel(), secondary: true },
        { id: "continue", label: "Continue", success: "success", disabled: !Boolean(uploadedFile), onClick: () => onSubmit(), primary: true }
    ];

    return (
        <Form onSubmit={onSubmit}>
            {({ form }) => {
                formRef.current = form;
                return <form
                    className="dropzone_box"
                    onChange={onChange() as unknown as () => void}
                >
                    <div className={classNames("dropzone_area", uploadedFile && "dropzone_area_filled_bg")}>
                        <div className="file_upload_icon">
                            {uploadedFile ? <img src={Excel} className="mb-5 mt-5"/> : <Lottie  animationData={uploadcloud} loop={true} />}
                        </div>
                        <FileInput name="uploaded-file" setUploadedFile={setUploadedFile} />
                        <h4 className="mb-3 file-info">Drag & drop files or browse</h4>
                        <p className="mt-3">Please upload a Excel or CSV file exported from the SEMIS App</p>
                    </div>

                    <ModalActions>
                        <ButtonStrip end >
                            {modalActions.map((action, i) =>
                                <Button
                                    key={i}
                                    {...action}
                                    loading={false}
                                >
                                    {action.label}
                                </Button>
                            )}
                        </ButtonStrip>
                    </ModalActions>
                </form>
            }}
        </Form>
    )
}

export default DropZone