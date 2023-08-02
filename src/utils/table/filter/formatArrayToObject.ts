
export const convertArrayToObject = (arr: string[][]) => {
    const obj: any = {};
    arr.forEach((item) => {
        const currentItem = item.toString().split(':');
        obj[currentItem[0]] = currentItem[2].replaceAll(';', ',');
    });
    return obj;
}
