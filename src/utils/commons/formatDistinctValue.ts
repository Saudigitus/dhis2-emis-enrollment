export const reducer = (array: any[]) => {
    return array.reduce(function (r, a) {
        r[a.programStage] = (r[a.programStage]) || [];
        if (a.id && a.value) {
            r[a.programStage].push({ dataElement: a.id, value: a.value });
        }
        return r;
    }, Object.create(null));
}
