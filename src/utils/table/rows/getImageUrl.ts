import { useConfig } from "@dhis2/app-service-config"

export const GetImageUrl = () => {
    const { baseUrl } = useConfig()

    function imageUrl({ trackedEntity, attribute }: { attribute: string, trackedEntity: string }) {
        return `${baseUrl}/api/trackedEntityInstances/${trackedEntity}/${attribute}/image?dimension=MEDIUM`
    }

    return {
        imageUrl
    }
}