import { useAlert } from '@dhis2/app-runtime';
import { AlertOptions, AlertType } from '../../types/alert/AlertProps';

const useShowAlerts = () => {
    const { show, hide } = useAlert(({ message }: AlertOptions) => message, ({ type }: AlertType) => ({
        ...type,
        duration: 3000
    }))

    return {
        show,
        hide
    }
}

export default useShowAlerts
