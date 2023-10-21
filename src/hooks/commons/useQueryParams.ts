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
        return React.useMemo(() => new URLSearchParams(searchParams), [searchParams])
    }

    const urlParamiters = () => {
        return {
            school: useQuery().get('school'),
            schoolName: useQuery().get('schoolName'),
            position: useQuery().get('position'),
            employmentType: useQuery().get('employmentType'),
            academicYear: useQuery().get('academicYear')
        }
    }
    return { add, remove, useQuery, urlParamiters }
}
export { useParams }
