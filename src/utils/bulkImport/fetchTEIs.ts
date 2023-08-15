import {type ProgramConfig} from "../../types/programConfig/ProgramConfig";

export const getProgramTEAttributeID = (programConfig: ProgramConfig, attribute: string): string => {
    const attr = programConfig?.programTrackedEntityAttributes.filter((v: any) => {
        if (v.trackedEntityAttribute.displayName === attribute) {
            return true;
        }
        return false;
    })
    if (attr?.length > 0) {
        return attr[0]?.trackedEntityAttribute?.id
    }
    return "";
}
export const fetchTEI = async (apiBaseUrl: string, program: ProgramConfig, teiId: string) => {
    // getProgramTEAttributeID("sam")
    const fetcher = async (url: string): Promise<any> => {
        fetch(url, {credentials: "include"})
            .then(async (resp: Response) => {
                if (resp.status >= 200 && resp.status < 300) {
                    return await Promise.resolve(resp.json())
                } else {
                    throw new Error(resp.statusText)
                }
            })
            .catch(async (resp: Response) => {
                const error = new Error(`${resp?.statusText}  ${resp?.status}`)
                console.error(
                    `fetchTEI ${teiId} fetch error: `,
                    error
                )
                return await Promise.reject(error)
            })
    }
    if (program !== undefined) {
        const systemID = getProgramTEAttributeID(program, "System ID")
        const fields = 'trackedEntity,trackedEntityType,attributes'
        const filters = `${systemID}:EQ:${teiId}`
        const url = `${apiBaseUrl}tracker/trackedEntities.json?program=${program?.id}&ouMode=ACCESSIBLE&fields=${fields}&filter=${filters}`
        console.log(url)
        const json = await fetcher(url).catch(async (error: any) => await Promise.reject(error))
        if (json?.instances.length > 0) {
            return json?.instances[0];
        }
    }
    return undefined;
}
