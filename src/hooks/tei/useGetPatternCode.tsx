import { useDataEngine } from "@dhis2/app-runtime"
import { type CustomAttributeProps } from "../../types/table/AttributeColumns";
import { useState } from "react";

const TEI_ATTRIBUTES: any = {
    results: {
        resource: "trackedEntityAttributes",
        id: ({ id }: { id: string }) => `${id}/generate`,
        params: {
            expiration: 3
        }
    }
}

interface QueryResults {
    results: {
        value: string
    }
}

type Generated = Record<string, string>;

export const useGetPatternCode = () => {
    const engine = useDataEngine()
    const [loadingCodes, setloadingCodes] = useState(false)
    const [value, setvalue] = useState<Generated>({})

    async function returnPattern(variables: CustomAttributeProps[]) {
        setloadingCodes(true)
        for (const variable of variables) {
            const { pattern = "", name: id }: CustomAttributeProps = variable
            let code: QueryResults = { results: { value: "" } }
            if (pattern.length > 0) {
                console.log(pattern, id);
                code = await engine.query(TEI_ATTRIBUTES, { variables: { id } })
                setvalue({ [id]: code?.results?.value })
            }
        }
        setloadingCodes(false)
    }

    return {
        returnPattern,
        loadingCodes,
        generatedVariables: value
    }
}
