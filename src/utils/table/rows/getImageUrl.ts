import { useRecoilValue } from "recoil"
import { DataStoreBulkOperationsState } from "../../../schema/dataStoreBulkOperationsSchema"

export const GetImageUrl = () => {

    function imageUrl({ trackedEntity, attribute }: { attribute: string, trackedEntity: string }) {
        return `https://emis.dhis2.org/startracker/api/trackedEntityInstances/${trackedEntity}/${attribute}/image?dimension=MEDIUM`
    }

    return {
        imageUrl
    }
}