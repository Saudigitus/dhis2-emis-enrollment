import {useDataQuery} from "@dhis2/app-runtime";
import {useDataEngine} from "@dhis2/app-runtime";
import {useExportTemplateProps} from "../../types/modal/ModalProps";
import useShowAlerts from "../commons/useShowAlert";
import {useSearchParams} from "react-router-dom";
import {format} from "date-fns";
import {validationSheetConstructor} from "./validationSheetConstructor";
import {convertNumberToLetter} from "../../utils/commons/convertNumberToLetter";
import {Attribute} from "../../types/generated/models";
import {capitalizeString} from "../../utils/commons/formatCamelCaseToWords";
import {getSelectedKey} from "../../utils/commons/dataStore/getSelectedKey";
import {VariablesTypes} from "../../types/variables/AttributeColumns";
// import {getHeaderBgColor} from "./getHeaderBgColor";
import {cellBorders, cellFillBg} from "../../utils/constants/exportTemplate/templateStyles";
// import {ta, tr} from "date-fns/locale";
import {EventQueryProps} from "../../types/api/WithoutRegistrationProps";
import {TeiQueryProps} from "../../types/api/WithRegistrationProps";
import {getDataStoreKeys} from "../../utils/commons/dataStore/getDataStoreKeys";
// import { useQueryParams } from "../commons/useQueryParams"
import {useRecoilValue} from "recoil";
import {HeaderFieldsState} from "../../schema/headersSchema";
import {useParams} from "../commons/useQueryParams";
import {formatResponseRows} from "../../utils/table/rows/formatResponseRows";
// import {ProgramConfigState} from "../../schema/programSchema";

const DATA_STORE_NAME: string = "semis"
const DATA_STORE_VALUE_KEY: string = "values"

export enum SectionVariablesTypes {
    EnrollmentDetails = "Enrollment Details",
    Profile = "Student Profile",
    SocioEconomics = "Socio Economics",
}

const oneProgramQuery: any = {
    program: {
        resource: "programs",
        id: ({programId}: { programId: string }) => programId,
        params: {
            fields: [
                "id,displayName,programTrackedEntityAttributes[mandatory,trackedEntityAttribute[id,displayName,valueType,unique,generated,optionSetValue,optionSet[id,displayName,options[id,displayName,code]]]],programStages[id,displayName,programStageDataElements[compulsory,dataElement[id,displayName,valueType,optionSetValue,optionSet[id,displayName,options[id,displayName,code]]]]"
            ]
        }
    }
};

const EVENT_QUERY = (
    {
        ouMode,
        page,
        pageSize,
        program,
        order,
        programStage,
        filter,
        orgUnit,
        filterAttributes,
        trackedEntity
    }: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            order,
            page,
            pageSize,
            ouMode,
            program,
            programStage,
            orgUnit,
            filter,
            trackedEntity,
            filterAttributes,
            fields: "*"
        }
    }
})

const TEI_QUERY = (
    {
        ouMode,
        pageSize,
        program,
        trackedEntity,
        orgUnit,
        order
    }: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            program,
            order,
            ouMode,
            pageSize,
            trackedEntity,
            orgUnit,
            fields:
                "trackedEntity,trackedEntityType,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,orgUnit,program,trackedEntity,status],programOwners"
        }
    }
})

const dataStoreValuesQuery: any = {
    values: {
        resource: `dataStore/${DATA_STORE_NAME}/${DATA_STORE_VALUE_KEY}`
    }
}
const reserveValuesQuery: any = {
    values: {
        resource: "trackedEntityAttributes",
        id: ({
                 numberOfReserve,
                 attributeID
             }: {
            numberOfReserve: number,
            attributeID: string
        }) => `${attributeID}/generateAndReserve?numberToReserve=${numberOfReserve}`,
    }
}

export default function useExportTemplate() {
    const engine = useDataEngine()
    const {
        program,
        registration,
        socioEconomics
    } = getDataStoreKeys()
    const [searchParams, _] = useSearchParams()
    const {
        hide,
        show
    } = useShowAlerts()
    // const programConfig = useRecoilValue(ProgramConfigState)
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const {urlParamiters} = useParams()
    const school = urlParamiters().school as unknown as string
    const {refetch: loadOneProgram} = useDataQuery(oneProgramQuery, {lazy: true});
    // const { refetch: loadDataStoreValues} = useDataQuery(dataStoreValuesQuery , {lazy: true })
    const {refetch: loadReserveValues} = useDataQuery(reserveValuesQuery, {lazy: true})
    const {getDataStoreData: programConfigDataStore} = getSelectedKey();

    async function generateInformations(inputValues: useExportTemplateProps, isNew: boolean = true) {
        const sectionType: string | null = searchParams.get('sectionType')

        if (sectionType === null) {
            throw new Error("Couldn't find section type in url params")
        }

        // const dataStoreValues: any = await loadDataStoreValues()
        // const programConfigDataStore: any = dataStoreValues?.values?.find((d: any) => d.key === sectionType)

        if (programConfigDataStore.program === undefined) {
            throw Error("Couldn't get program uid from datastore << values >>")
        }

        const {
            program: programId,
            registration
        }: any = programConfigDataStore
        const correspondingProgram: any = await loadOneProgram({programId})

        if (correspondingProgram.program === undefined || correspondingProgram.program === null) {
            throw Error(`Couldn't find program << ${programId as string} >> in DHIS2`)
        }

        if (registration === undefined || registration === null) {
            throw Error(`Couldn't find registration config in datastore`)
        }

        if (programConfigDataStore["socio-economics"] === undefined) {
            throw Error(`Couldn't find socio-economics config in datastore`)
        }

        const currentAttributes = correspondingProgram?.program?.programTrackedEntityAttributes?.map(
            (p: { mandatory: boolean, trackedEntityAttribute: any }) => {
                return {mandatory: p.mandatory, ...p.trackedEntityAttribute}
            }
        ) || [];

        let newHeaders: any = [];
        let newDataList: any = [];

        if (currentAttributes.length > 0) {
            newHeaders = currentAttributes.map((attribute: any) => ({
                key: attribute.id,
                id: attribute.id,
                unique: attribute.unique || false,
                generated: attribute.generated || false,
                valueType: attribute.valueType,
                label: attribute.displayName,
                optionSetValue: attribute.optionSetValue || false,
                options: attribute.optionSet?.options || [],
                optionSetId: attribute.optionSet?.id || null,
                required: attribute.mandatory || false,
                metadataType: VariablesTypes.Attribute,
                sectionDataType: SectionVariablesTypes.Profile
            }));
        }

        let reserveValuePayload: any = {}

        for (let attr of newHeaders) {
            if (attr.unique && attr.generated && +inputValues.studentsNumber > 0) {
                const reserveValueResponse: any = await loadReserveValues({
                    numberOfReserve: +inputValues.studentsNumber,
                    attributeID: attr.id
                })
                if (reserveValueResponse?.values?.length > 0) {
                    reserveValuePayload[`${attr.id}`] = reserveValueResponse.values
                }
            }
        }

        const registrationProgramStageDataElements = correspondingProgram?.program?.programStages?.reduce((prev: any, curr: any) => {
            if (curr.id === registration.programStage) {
                const newDataElements =
                    curr.programStageDataElements?.reduce((dxPrev: any, dxCurr: any) => {
                        dxPrev.push({
                            key: `${registration.programStage}.${dxCurr.dataElement?.id}`,
                            id: `${registration?.programStage}.${dxCurr.dataElement?.id}`,
                            label: dxCurr.dataElement?.displayName,
                            valueType: dxCurr.dataElement?.valueType,
                            optionSetValue: dxCurr.dataElement?.optionSetValue || false,
                            options: dxCurr.dataElement?.optionSet?.options || [],
                            optionSetId: dxCurr.dataElement?.optionSet?.id || null,
                            required: dxCurr?.compulsory || false,
                            metadataType: VariablesTypes.DataElement,
                            sectionDataType: SectionVariablesTypes.EnrollmentDetails
                        });
                        return dxPrev;
                    }, []) || [];

                prev = [...prev, ...newDataElements];
                return prev;
            }

            return prev;
        }, []) || [];

        const socioEconomicProgramStageDataElements = correspondingProgram?.program?.programStages?.reduce((prev: any, curr: any) => {
            if (curr.id === programConfigDataStore?.["socio-economics"]?.programStage) {
                const newDataElements =
                    curr.programStageDataElements?.reduce((dxPrev: any, dxCurr: any) => {
                        dxPrev.push({
                            key: `${programConfigDataStore?.["socio-economics"]?.programStage}.${dxCurr.dataElement?.id}`,
                            id: `${programConfigDataStore?.["socio-economics"]?.programStage}.${dxCurr.dataElement?.id}`,
                            label: dxCurr.dataElement?.displayName,
                            valueType: dxCurr.dataElement?.valueType,
                            optionSetValue: dxCurr.dataElement?.optionSetValue || false,
                            options: dxCurr.dataElement?.optionSet?.options || [],
                            optionSetId: dxCurr.dataElement?.optionSet?.id || null,
                            required: dxCurr?.compulsory || false,
                            metadataType: VariablesTypes.DataElement,
                            sectionDataType: SectionVariablesTypes.SocioEconomics
                        });
                        return dxPrev;
                    }, []) || [];

                prev = [...prev, ...newDataElements];
                return prev;
            }

            return prev;
        }, []) || [];

        let newBeginHeaders = [
            {
                key: `ref`,
                id: `ref`,
                label: 'Ref',
                valueType: 'TEXT',
                optionSetValue: false,
                options: [],
                optionSetId: null,
                required: false
            },
            {
                key: `orgUnitName`,
                id: `orgUnitName`,
                label: 'School Name',
                valueType: 'TEXT',
                optionSetValue: false,
                options: [],
                optionSetId: null,
                required: true
            },
            {
                key: `orgUnit`,
                id: `orgUnit`,
                label: 'School UID',
                valueType: 'TEXT',
                optionSetValue: false,
                options: [],
                optionSetId: null,
                required: true
            },
            {
                key: `enrollmentDate`,
                id: `enrollmentDate`,
                label: 'Enrollment date',
                valueType: 'DATE',
                optionSetValue: false,
                options: [],
                optionSetId: null,
                required: true
            }
        ]
        if (!isNew) {
            newBeginHeaders = newBeginHeaders.concat([
                {
                    key: `trackedEntity`,
                    id: `trackedEntity`,
                    label: 'Tracked Entity',
                    valueType: 'TEXT',
                    optionSetValue: false,
                    options: [],
                    optionSetId: null,
                    required: false
                },
                {
                    key: `enrollmentId`,
                    id: `enrollment`,
                    label: 'Enrollment',
                    valueType: 'TEXT',
                    optionSetValue: false,
                    options: [],
                    optionSetId: null,
                    required: false
                },
                {
                    key: `registrationEvent`,
                    id: `registrationEvent`,
                    label: 'RegistrationEvent',
                    valueType: 'TEXT',
                    optionSetValue: false,
                    options: [],
                    optionSetId: null,
                    required: false
                },
                {
                    key: `registrationEventOccurredAt`,
                    id: `registrationEventOccurredAt`,
                    label: 'RegistrationEventOccurredAt',
                    valueType: 'TEXT',
                    optionSetValue: false,
                    options: [],
                    optionSetId: null,
                    required: false
                },
                {
                    key: `socioEconEvent`,
                    id: `socioEconEvent`,
                    label: 'SocioEconEvent',
                    valueType: 'TEXT',
                    optionSetValue: false,
                    options: [],
                    optionSetId: null,
                    required: false
                },
                {
                    key: `socioEconEventOccurredAt`,
                    id: `socioEconEventOccurredAt`,
                    label: 'SocioEconEventOccurredAt',
                    valueType: 'TEXT',
                    optionSetValue: false,
                    options: [],
                    optionSetId: null,
                    required: false
                }
            ])
        }

        const newBeginHeadersFormatted = newBeginHeaders.map((header) => {
            return {
                ...header,
                metadataType: VariablesTypes.Default,
                sectionDataType: SectionVariablesTypes.EnrollmentDetails
            }
        })

        newHeaders = [...newBeginHeadersFormatted, ...registrationProgramStageDataElements, ...newHeaders, ...socioEconomicProgramStageDataElements];

        if (+inputValues.studentsNumber > 0) {
            for (let i = 0; i < +inputValues.studentsNumber; i++) {
                const payload: any = {};
                let incrementHeader = 0
                for (const newHeader of newHeaders) {
                    let value = ''
                    if (incrementHeader === 0) value = `${i + 1}`
                    if (incrementHeader === 1) value = `${inputValues.orgUnitName}`
                    if (incrementHeader === 2) value = `${inputValues.orgUnit}`
                    if (incrementHeader === 3) value = `${format(new Date(), `${inputValues.academicYearId}-MM-dd`)}`

                    if (incrementHeader > 3) {
                        const foundReserve = reserveValuePayload[newHeader.id]
                        if (foundReserve) {
                            value = foundReserve[0].value
                            reserveValuePayload[newHeader.id] = reserveValuePayload[newHeader.id].filter((resVam: {
                                value: any
                            }) => value !== resVam.value)
                        }
                    }

                    payload[`${newHeader.id}`] = {
                        label: newHeader.label,
                        value
                    };
                    incrementHeader++
                }

                newDataList.push(payload);
            }
        }

        return {
            headers: newHeaders || [],
            datas: newDataList || [],
            currentProgram: correspondingProgram
        }
    };

    async function handleExportToWord(values: useExportTemplateProps, isNew: boolean = true) {
        try {
            values.setLoadingExport && values.setLoadingExport(true)
            let parameters = values;
            let localData: any[] = [];
            if (!isNew) {
                const {
                    results: {instances: eventsInstances}
                } = await engine.query(
                    EVENT_QUERY({
                        ouMode: "SELECTED",
                        paging: false,
                        program: program as unknown as string,
                        order: "createdAt:desc",
                        programStage: registration?.programStage as unknown as string,
                        filter: headerFieldsState?.dataElements,
                        filterAttributes: headerFieldsState?.attributes,
                        orgUnit: school
                    })
                )
                const allTeis: [] = eventsInstances.map(
                    (x: { trackedEntity: string }) => x.trackedEntity
                )
                const {
                    results: {instances: teiInstances}
                } = await engine.query(
                    TEI_QUERY({
                        program: program as unknown as string,
                        orgUnit: school,
                        trackedEntity: allTeis.join(";")
                    })
                )
                let socioEconomicInstances: any[] = []

                for (const tei of allTeis) {
                    const {
                        results: {instances: socioEconData}
                    } = await engine.query(
                        EVENT_QUERY({
                            ouMode: "SELECTED",
                            program: program as unknown as string,
                            order: "createdAt:desc",
                            programStage: socioEconomics.programStage,
                            orgUnit: school,
                            trackedEntity: tei
                        })
                    )
                    socioEconomicInstances = socioEconomicInstances.concat(socioEconData)
                }

                localData = formatResponseRows({
                    eventsInstances: eventsInstances,
                    teiInstances,
                    socioEconInstances: socioEconomicInstances
                    // programConfig: programConfig,
                    // programStageId: programConfigDataStore["socio-economics"].programStage
                })
                console.log("FormatedData>", localData)
                parameters = {
                    ...parameters,
                    studentsNumber: `${localData.length}`
                }
            }

            const workbook = new window.ExcelJS.Workbook();
            const dataSheet = workbook.addWorksheet("Data");
            const metaDataSheet = workbook.addWorksheet("Metadata", {state: 'hidden'});
            const validationSheet = workbook.addWorksheet("Validation", {state: 'veryHidden'});
            dataSheet.protect('', {
                selectLockedCells: true,
                selectUnlockedCells: true,
                formatCells: true,
                formatColumns: false,
                formatRows: false,
                insertColumns: false,
                insertRows: false,
                deleteColumns: false,
                deleteRows: false,
                sort: false,
                autoFilter: false,
                pivotTables: false
            });

            const {
                headers,
                datas,
                currentProgram
            } = await generateInformations(parameters, isNew)

            // Generating validation data
            validationSheetConstructor(validationSheet, headers)

            // generation des données du metadatas
            metaDataSheet.columns = [
                {
                    header: "programId",
                    key: "programId",
                    width: 20
                },

                {
                    header: "programName",
                    key: "programName",
                    width: 20
                },
                {
                    header: "",
                    key: "none",
                    width: 20
                },
                {
                    header: "id",
                    key: "id",
                    width: 20
                },
                {
                    header: "name",
                    key: "name",
                    width: 30
                },

                {
                    header: "valueType",
                    key: "valueType",
                    width: 30
                },

                {
                    header: "options",
                    key: "options",
                    width: 50
                }
            ];

            for (let i = 0; i < headers.length; i++) {
                metaDataSheet.addRow({
                    id: headers[i].id,
                    name: headers[i].label,
                    valueType: headers[i].valueType,
                    options: headers[i].optionSetValue
                        ? headers[i].options?.map((op: {
                            code: string,
                            displayName: string
                        }) => op.code || op.displayName)?.join(",")
                        : "",
                    programId: i === 0 ? currentProgram?.program?.id : "",
                    programName:
                        i === 0 ? currentProgram?.program?.displayName : "",
                    none: "",
                });
            }

            // Ajout des headers de la data
            dataSheet.columns = headers.map((header: any, index: number) => ({
                header: `${header.label} ${header.required ? "*" : ""}`,
                key: `${header.id}`,
                width: index === 0 ? 20 : 30,
                style: {
                    font: {bold: true},
                },
            }));
            dataSheet.addRow(headers.reduce((prev: any, curr: any) => {
                prev[curr.id] = `${curr.label} ${curr.required ? "*" : ""}`;
                return prev;
            }, {}));

            // Create Sections for colSpan
            const sections: any = {
                [SectionVariablesTypes.EnrollmentDetails]: [],
                [SectionVariablesTypes.Profile]: [],
                [SectionVariablesTypes.SocioEconomics]: []
            };

            headers.forEach((header: any) => {
                sections[header.sectionDataType].push(header.id);
            });

            // Add the sections row above the headers row
            let colIndex = 1;
            for (const section in sections) {
                if (sections[section].length > 0) {
                    dataSheet.mergeCells(1, colIndex, 1, colIndex + sections[section].length - 1);
                    dataSheet.getCell(1, colIndex).alignment = {
                        horizontal: 'center',
                        vertical: 'middle'
                    };
                    dataSheet.getCell(1, colIndex).value = section;
                    colIndex += sections[section].length;
                }
            }

            // Add background in the sections row
            const firstRow = dataSheet.getRow(1);
            headers.forEach((header: any, index: number) => {
                const cell = firstRow.getCell(index + 1);
                cell.fill = cellFillBg(header.sectionDataType);
                cell.border = cellBorders;
                cell.font = {bold: true};
            });

            // Add background in the headers row
            const secondRow = dataSheet.getRow(2);
            const headersToHide: string[] = [
                'orgUnit', 'trackedEntity', 'enrollment', 'registrationEvent', 'socioEconEvent',
                'registrationEventOccurredAt', 'socioEconEventOccurredAt'];
            headers.forEach((header: any, index: number) => {
                const cell = secondRow.getCell(index + 1);
                cell.fill = cellFillBg(header.metadataType);
                cell.border = cellBorders;
                cell.font = {bold: true};

                // Hide the orgUnit ID column and other ID columns
                if (headersToHide.includes(header.id)) {
                    const col = dataSheet.getColumn(index + 1)
                    col.hidden = true;
                }
            });

            // Ajout du deuxieme headers
            const headerRow = dataSheet.addRow(headers.reduce((prev: any, curr: any) => {
                prev[curr.id] = curr.id;
                return prev;
            }, {}));

            // Add background in the header row
            headers.forEach((header: any, index: number) => {
                const cell = headerRow.getCell(index + 1);
                cell.fill = cellFillBg(header.metadataType);
                cell.border = cellBorders;
                cell.font = {bold: true};
            });

            // Hide the header IDs row
            headerRow.hidden = true;

            // Ajout des rows maintenants
            if (isNew) {
                for (const data of datas) {
                    const row = dataSheet.addRow(
                        headers.reduce((prev: any, curr: any) => {
                            prev[curr.id] = data[curr.id]?.value;
                            // prev[curr.id] = "";
                            return prev;
                        }, {})
                    )

                    headers.forEach((vals: any, index: number) => {
                        if (!headersToHide.includes(vals.key) && vals.label !== "System ID") {
                            const cell = row.getCell(index + 1)
                            cell.protection = { locked: false };
                        }
                    })
                }
            } else {
                let index = 0
                for (const data of datas) {
                    const rowData = localData[index]
                    console.log(rowData)
                    const row = dataSheet.addRow(
                        headers.map((curr: any) => {
                            const allIds = String(curr.id).split(".")
                            const id = allIds[allIds.length - 1]
                            if (rowData[id] && typeof rowData[id] === "object") {
                                return rowData[`${id}-val`]
                            }

                            return rowData[id] ?? data[id]?.value
                        })
                    )
                    index++
                    headers.forEach((vals: any, index: number) => {
                        if (!headersToHide.includes(vals.key) && vals.label !== "System ID") {
                            const cell = row.getCell(index + 1)
                            cell.protection = { locked: false };
                        }
                    })
                }
            }

            // Data Validation
            for (let i = 0; i < datas.length; i++) {
                const currentRow = dataSheet.getRow(i + 4);
                if (currentRow !== undefined && currentRow !== null) {
                    for (let j = 0; j < headers.length; j++) {
                        const currentCell = currentRow.getCell(j + 1);
                        if (currentCell && headers[j]?.optionSetValue) {
                            // Get the column letter from the number
                            const columnLetter = convertNumberToLetter(validationSheet.getColumn(headers[j].optionSetId).number);

                            // Formula composition for dataValidation
                            const formula = `'${validationSheet.name}'!$${columnLetter}$2:$${columnLetter}$${headers[j].options.length + 1}`;
                            currentCell.dataValidation = {
                                type: "list",
                                allowBlank: true,
                                formulae: [formula]
                            };
                        }
                        if (currentCell && headers[j]?.valueType === "BOOLEAN") {
                            currentCell.dataValidation = {
                                type: "list",
                                allowBlank: true,
                                formulae: ['"true,false"'],
                            };
                        }
                        if (currentCell && headers[j]?.valueType === Attribute.valueType.TRUE_ONLY) {
                            currentCell.dataValidation = {
                                type: "list",
                                allowBlank: true,
                                formulae: ['"true"'],
                            };
                        }
                    }
                }
            }

            // fix the section and headers row
            dataSheet.views = [
                {
                    state: 'frozen',
                    ySplit: 1
                },
                {
                    state: 'frozen',
                    ySplit: 2
                }
            ];

            metaDataSheet.protect('', {
                selectLockedCells: true,
                selectUnlockedCells: true,
                formatCells: true,
                formatColumns: false,
                formatRows: false,
                insertColumns: false,
                insertRows: false,
                insertHyperlinks: false,
                deleteColumns: false,
                deleteRows: false,
                sort: false,
                autoFilter: false,
                pivotTables: false,
                objects: false,
                scenarios: false
            });

            workbook.xlsx.writeBuffer().then((buffer: any) => {
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                window.saveAs(blob, `${capitalizeString(searchParams.get("sectionType") ?? "")} Data Import - Template.xlsx`);
            });

            show({
                message: "File exported successfully",
                type: {success: true},
            });
            setTimeout(hide, 5000);
            values.setLoadingExport && values.setLoadingExport(false)

        } catch (err: any) {
            console.log(err)
            show({
                message: err.message,
                type: {critical: true},
            });
            setTimeout(hide, 5000);
            values.setLoadingExport && values.setLoadingExport(false)
        }
    }

    return {
        handleExportToWord
    }
}
