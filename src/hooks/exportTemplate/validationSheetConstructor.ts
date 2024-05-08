export function validationSheetConstructor(validationSheet: any, headers: any) {
    const filteredHeaders = headers.filter((header: any) => header.options.length)
    validationSheet.columns = filteredHeaders.map((header: any) => ({
        header: `${header.id}`,
        key: `${header.id}`,
        width: 30
    }))
    const arrayOfArrays: any[] = [];

    // Set the maximum number of options
    const numOptions = Math.max(...filteredHeaders.map((header: any)  => header.options.length));

    // Group header options by rows
    for (let i = 0; i < numOptions; i++) {
        const optionsArray: string[] = [];

        for (let j = 0; j < filteredHeaders.length; j++) {
            const optionCode = filteredHeaders[j].options && filteredHeaders[j].options[i] ? filteredHeaders[j].options[i].code : "";
            optionsArray.push(optionCode);
        }
        arrayOfArrays.push(optionsArray);
    }

    // Create the rows with options
    for (let i = 0; i < arrayOfArrays.length; i++) {
        validationSheet.addRow(arrayOfArrays[i]);
    }
}