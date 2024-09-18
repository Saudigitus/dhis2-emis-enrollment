import styles from "./dropzone.module.css"
import UploadCloud from "../../assets/images/bulkImport/upload"
import { ModalActions, Button, ButtonStrip } from "@dhis2/ui";

function DropZone() {

    //     const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];

    //     const inputFiles = document.querySelectorAll(
    //         ".dropzone-area input[type='file']"
    //     );

    // console.log(inputFiles, 'lena')

    //     const inputElement: any = inputFiles[0];

    //     const dropZoneElement: any = inputElement?.closest(".dropzone-area");

    //     inputElement?.addEventListener("change", (e: any) => {
    //         if (inputElement?.files.length) {
    //             updateDropzoneFileList(dropZoneElement, inputElement?.files[0]);
    //         }
    //     });

    //     dropZoneElement?.addEventListener("dragover", (e: any) => {
    //         e.preventDefault();
    //         dropZoneElement?.classList.add("dropzone--over");
    //     });

    //     ["dragleave", "dragend"].forEach((type) => {
    //         dropZoneElement?.addEventListener(type, (e: any) => {
    //             dropZoneElement?.classList.remove("dropzone--over");
    //         });
    //     });

    //     dropZoneElement?.addEventListener("drop", (e: any) => {
    //         e.preventDefault();

    //         if (e?.dataTransfer?.files?.length) {
    //             inputElement?.files = e.dataTransfer.files;

    //             updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
    //         }

    //         dropZoneElement?.classList.remove("dropzone--over");
    //     });

    //     const updateDropzoneFileList = (dropzoneElement: any, file: any) => {
    //         let dropzoneFileMessage = dropzoneElement.querySelector(".file-info");

    //         dropzoneFileMessage.innerHTML = `
    //         ${file.name}, ${file.size} bytes
    //     `;
    //     };

    //     dropzoneBox.addEventListener("reset", (e) => {
    //         let dropzoneFileMessage = dropZoneElement?.querySelector(".file-info");

    //         dropzoneFileMessage.innerHTML = `No Files Selected`;
    //     });

    //     dropzoneBox.addEventListener("submit", (e) => {
    //         e.preventDefault();
    //         const myFiled: any = document.getElementById("upload-file");
    //         console.log(myFiled.files[0]);
    //     });

    const modalActions = [
        { id: "cancel", type: "reset", label: "Cancel", disabled: false, onClick: () => { }, secondary: true },
        { id: "continue", type: "submit", label: "Continue", success: "success", disabled: false, onClick: () => { }, primary: true }
    ];

    return (
        <>
            <form className={styles.dropzone_box}>
                <div className={styles.dropzone_area}>
                    <div className={styles.file_upload_icon}>
                        <UploadCloud />
                    </div>
                    <input type="file" required id="upload-file" name="uploaded-file" />
                    {/* <p className={styles.file_info}>No Files Selected</p> */}
                    <h4 className="mb-3">Drag & drop files or browse</h4>
                    <p className="mt-3">Please upload a Excel or CSV file exported from the SEMIS App</p>
                </div>
                {/* <div className="dropzone-actions">
                    <button type="reset">
                        Cancel
                    </button>
                    <button id="submit-button" type="submit">
                        Save
                    </button>
                </div> */}

                <ModalActions>
                    <ButtonStrip end >
                        {modalActions.map((action, i) => {
                            return (

                                <Button
                                    key={i}
                                    {...action}
                                    // className={}
                                    loading={false}
                                >
                                    {action.label}
                                </Button>

                            )
                        })}
                    </ButtonStrip>
                </ModalActions>
            </form>
        </>
    )
}

export default DropZone