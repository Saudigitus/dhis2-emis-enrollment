import axios from 'axios';
import { useState } from 'react'
import { useConfig } from "@dhis2/app-runtime"

// const POST_TEI = (data: any) => ({
//     resource: "tracketEntityInstances",
//     type: "create",
//     data: data
// })

function requestHeaders(user: string, pass: string) {
    return {
        headers: {
            Accept: "application/json",
            Authorization: "Basic " + btoa(user + ":" + pass),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Access-Control-Max-Age": "60"
        }
    };
}

export default function usePostTei() {
    const [loading, setLoading] = useState<boolean>(false)
    const { baseUrl } = useConfig()

    const postTei = async (data: any, user: string, password: string) => {
        setLoading(true)
        await axios.post(`${baseUrl}/api/trackedEntityInstances`, data, requestHeaders(user, password))
            .then(response => {
                console.log(response);
            }).catch(error => { console.log(error); })
        setLoading(false)
    }

    return { loading, postTei }
}
