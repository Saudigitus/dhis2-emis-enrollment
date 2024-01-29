export const reducer = (array: any[]) => {
    return array.reduce(function (r, a) {
        r[a.programStage] = (r[a.programStage]) || [];
        if (a.id && a.assignedValue) {
            r[a.programStage].push({ dataElement: a.id, value: a.assignedValue });
        }
        return r;
    }, Object.create(null));
}
