export const reducer = (array: any[]) => {
    return array.reduce(function (r, a) {
        if (a.value !== undefined) {
            r[a.programStage] = (r[a.programStage]) || [];
            r[a.programStage].push({ dataElement: a.id, value: a.value });
        }
        return r;
    }, Object.create(null));
}
