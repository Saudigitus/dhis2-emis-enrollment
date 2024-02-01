import { useDataEngine } from "@dhis2/app-runtime"
import { CustomAttributeProps, GeneratedCodeType, PatternCodeQueryResults } from "../../types/common/components";
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

export const useGetPatternCode = () => {
    const engine = useDataEngine()
    const [loadingCodes, setloadingCodes] = useState(false)
    const [value, setvalue] = useState<GeneratedCodeType>({})

    async function returnPattern(variables: CustomAttributeProps[]) {
        setloadingCodes(true)
        const patterns = []
        for (const variable of variables) {
            const { pattern = "", name: id }: CustomAttributeProps = variable
            let code: PatternCodeQueryResults = { results: { value: "" } }
            
            if (pattern?.length > 0) {
                code = await engine.query(TEI_ATTRIBUTES, { variables: { id } }) as unknown as PatternCodeQueryResults
                patterns.push({ [id]: code?.results?.value })
            }
        }
        const value = patterns.reduce((key, pattern) => ({ ...key, ...pattern }), {});

        setvalue(value);
        setloadingCodes(false)
    }

    return {
        returnPattern,
        loadingCodes,
        generatedVariables: value
    }
}
