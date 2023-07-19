import { useSearchParams } from 'react-router-dom'
import React from 'react'

const useParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const add = (key: string, value: string) => {
        searchParams.set(key, value)
        setSearchParams(searchParams)
    }
    const remove = (key: string) => {
        searchParams.delete(key)
        setSearchParams(searchParams)
    }
    const useQuery = () => {
        return React.useMemo(
            () => new URLSearchParams(searchParams),
            [searchParams]
        )
    }
    return { add, remove, useQuery }
}
export { useParams }
