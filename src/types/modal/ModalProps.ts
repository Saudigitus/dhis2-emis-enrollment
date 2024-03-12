
interface ModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    title: string
    children: React.ReactNode
}

interface ModalContentProps {
    setOpen: (value: boolean) => void
    sectionName?: any
    enrollmentsData?: any
    bulkUpdate?: boolean
}

interface ModalContentUpdateProps {
    setOpen: (value: boolean) => void
    sectionName?: any
    formInitialValues?: any
    enrollmentsData?: any
    loadingInitialValues: boolean
}

export type { ModalProps, ModalContentProps, ModalContentUpdateProps }