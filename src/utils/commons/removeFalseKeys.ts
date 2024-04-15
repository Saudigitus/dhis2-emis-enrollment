export function removeFalseKeys(obj: any) {
    for (const key in obj) {
      if(obj[key] === false || obj[key] === "") {
        delete obj[key]; // Remove do objecto a key com o valor false
      }
    }
    return obj;
}