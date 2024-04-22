export function removeFalseKeys(obj: any) {
  for (const key in obj) {
    if (obj[key] === false) {
      delete obj[key]; // Remove do objecto a key com o valor false
    }
    if (obj[key] === "") {
      obj[key] = 0
    }
  }
  return obj;
}