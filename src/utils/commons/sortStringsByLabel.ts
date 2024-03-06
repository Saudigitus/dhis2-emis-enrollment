
interface option {
    label: string
    value: string
}

export function compareStringByLabel(a: option, b: option) {
    try {
        return Number(a.label.split(" ")[1]) - Number(b.label.split(" ")[1]);

    } catch (error) {
        if (a.label < b.label) {
            return -1;
        }
        if (a.label > b.label) {
            return 1;
        }
        return 0;
    }

}