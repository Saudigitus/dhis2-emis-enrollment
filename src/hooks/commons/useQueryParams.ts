import { useSearchParams } from 'react-router-dom'

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
        return new URLSearchParams(searchParams)
    }

    const urlParamiters = () => {
        return {
            school: useQuery().get('school'),
            schoolName: useQuery().get('schoolName'),
            academicYear: useQuery().get('academicYear'),
            sectionType: useQuery().get('sectionType'),
            grade: useQuery().get('grade'),
            class: useQuery().get('class'),
            position: useQuery().get('position'),
            employmentType: useQuery().get('employmentType')
        }
    }
    return { add, remove, useQuery, urlParamiters }
}
export { useParams }
