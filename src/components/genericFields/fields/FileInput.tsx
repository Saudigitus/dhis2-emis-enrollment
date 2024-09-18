
import React from 'react'

function FileInput(props: any) {
    const { name, setUploadedFile } = props

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setUploadedFile(file);
        };
        reader.readAsDataURL(file);
    };

    return (
        <input
            type="file"
            required
            id="upload-file"
            name={name}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
        />
    )
}

export default FileInput