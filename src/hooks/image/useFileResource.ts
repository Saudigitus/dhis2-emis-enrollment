import { useState } from 'react';
import { useDataEngine } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"

const POSTFILERESOURCEMUTATION: any = {
    resource: "fileResources",
    data: ({ data }: any) => data,
    type: "create"
}

const DELETEFILERESOURCEMUTATION: any = {
    resource: "fileResources",
    id: ({ id }: any) => id,
    type: "delete"
}

const GETFILERESOURCEQUERY: any = ({ trackedEntity, attribute }: { trackedEntity: string, attribute: string }) => ({
    results: {
        resource: `trackedEntityInstances/${trackedEntity}/${attribute}/image`,
        params: {
            dimension: "MEDIUM"
        }
    }
})

interface CreateFileInterface {
    file: any
}

interface CreateFileInterfaceResponse {
    response: {
        fileResource: {
            id: string
        }
    }
}

export const useFileResource = () => {
    const engine = useDataEngine()
    const { hide, show } = useShowAlerts()
    const [loading, setloading] = useState(false)

    function showAlert(message: string, type: any) {
        setloading(false)
        show({
            message: message,
            type: type
        });
        setTimeout(hide, 5000);
    }

    async function createFileResource({ file }: CreateFileInterface): Promise<{ fileId: string }> {
        setloading(true)
        // const blob = new Blob([file]);

        const postFile = await engine.mutate(POSTFILERESOURCEMUTATION, { variables: { data: { file: file } } }) as unknown as CreateFileInterfaceResponse

        const fileId = postFile.response.fileResource.id
        setloading(false)
        return {
            fileId
        }
    }

    async function getFileResource({ trackedEntity, attribute }: { trackedEntity: string, attribute: string }) {
        setloading(true)
        const file = await engine.query(GETFILERESOURCEQUERY({ trackedEntity, attribute }))
        setloading(false)
        return { file: file.results }
    }

    async function deleteFileResource(documentId: string): Promise<void> {
        setloading(true)
        await engine.mutate(DELETEFILERESOURCEMUTATION, {
            variables: { id: documentId },
            onError(error) {
                showAlert(`${("Could not delete image")}: ${error.message}`, { critical: true })
            },
            onComplete() {
                showAlert(`${("Successfully deleted image")}`, { success: true })
            }
        })

        setloading(false)
    }

    return {
        createFileResource,
        deleteFileResource,
        getFileResource,
        loading
    }
}