
import React, { useState, useEffect } from 'react'
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
    const [uploadedImage, setUploadedImage] = useState();

    const handleFileChange = async (event: any) => {
        const image = event.target.files[0];

        // Display the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);
        };
        reader.readAsDataURL(image);

        await createFileResource({ file: image }).then((response) => {
            input.onChange(response?.fileId);
        })
    };

    async function getImage() {
        await getFileResource({ trackedEntity: props.trackedEntity, attribute: input.name }).then((response) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(response.file);
        })
    }

    useEffect(() => {
        if (input.value && !uploadedImage) {
            getImage()
        }
    }, [input.value])


    const onRemove = () => {
        setUploadedImage("");
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
                uploadedImage ? (
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

            {(uploadedImage && !(loadingQuery)) &&
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