export function validationSheetConstructor(validationSheet: any, headers: any) {
    const headersWithOptions = headers.filter((header: any) => header.optionSetValue === true)

    // Removing duplicated headers by optionSetId
    const headersByOptionSetId = headersWithOptions.filter((value: any, index: number, self: any) =>
        self.findIndex((v: any) => v.optionSetId === value.optionSetId) === index
    );

    validationSheet.columns = headersByOptionSetId.map((header: any) => ({
        header: `${header.optionSetId}`,
        key: `${header.optionSetId}`,
        width: 30
    }))

    const arrayOfOptionsArray: any[] = [];

    // Set the maximum number of options
    const numOptions = Math.max(...headersByOptionSetId.map((header: any)  => header.options.length));

    // Group optionSet options by rows
    for (let i = 0; i < numOptions; i++) {
        const optionsArray: string[] = [];

        for (let j = 0; j < headersByOptionSetId.length; j++) {
            const optionCode = headersByOptionSetId[j].options && headersByOptionSetId[j].options[i] ? headersByOptionSetId[j].options[i].code : "";
            optionsArray.push(optionCode);
        }
        arrayOfOptionsArray.push(optionsArray);
    }

    // Create the rows with options
    for (let i = 0; i < arrayOfOptionsArray.length; i++) {
        validationSheet.addRow(arrayOfOptionsArray[i]);
    }
}