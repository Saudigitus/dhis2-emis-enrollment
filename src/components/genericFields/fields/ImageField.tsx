
import React, { useState } from 'react'
import { IconUpload24, CenteredContent, CircularLoader, IconCross24 } from "@dhis2/ui";
import { FormFieldsProps } from '../../../types/form/GenericFieldsTypes'
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useField, type FieldRenderProps } from "react-final-form";
import style from "./fields.module.css";
import { useFileResource } from '../../../hooks/image/useFileResource';

function ImageField(props: FormFieldsProps) {
    const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);
    const { createFileResource, getFileResource, deleteFileResource, loading: loadingQuery } = useFileResource()
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState();

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Display the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);
        };
        reader.readAsDataURL(file);

        await createFileResource({ file }).then((response) => {
            input.onChange(response?.fileId);
        })
    };

    const onRemove = () => {
        setUploadedImage("");
        setSelectedFile("");
        input.onChange("");
    }

    if (loadingQuery) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    return (
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
            {
                selectedFile ? (
                    <span>
                        {!(loadingQuery) &&
                            <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '200px' }} />
                        }
                    </span>
                ) :
                    <span>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                className={style.customDhis2Button}
                                component="span"
                                startIcon={<IconUpload24 />}
                            >
                                Choose File
                            </Button>
                        </label>

                    </span>
            }

            {(selectedFile && !(loadingQuery)) &&
                <div style={{ margin: "auto", display: "flex" }}>
                    <Button
                        className={style.customDhis2Button}
                        component="span"
                        startIcon={<IconCross24 />}
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                </div>
            }
        </Box>
    )
}

export default ImageField