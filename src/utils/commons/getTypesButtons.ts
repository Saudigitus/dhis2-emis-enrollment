export function getTypesOfButton(props: any) {
    const possibleTypes = ['primary', 'success', 'error', 'secondary', 'info', 'dark', 'warning', 'white']
    for (const type of possibleTypes) {
        if (props.hasOwnProperty(type)) {
            return type
        }
    }
}