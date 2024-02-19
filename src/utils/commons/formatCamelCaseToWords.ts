export const formatCamelCaseToWords = (text: string): string => {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
}

export const formatCamelToTitleCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }