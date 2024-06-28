import { useDataQuery } from "@dhis2/app-runtime";
import { useExportTemplateProps } from "../../types/modal/ModalProps";
import useShowAlerts from "../commons/useShowAlert";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { validationSheetConstructor } from "./validationSheetConstructor";
import { convertNumberToLetter } from "../../utils/commons/convertNumberToLetter";
import { Attribute } from "../../types/generated/models";
import { capitalizeString } from "../../utils/commons/formatCamelCaseToWords";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import { VariablesTypes } from "../../types/variables/AttributeColumns";
import { getHeaderBgColor } from "./getHeaderBgColor";


const DATA_STORE_NAME : string = "semis"
const DATA_STORE_VALUE_KEY: string = "values"


const oneProgramQuery : any = {
    program: {
      resource: "programs",
      id: ({ programId }: { programId: string }) => programId,
      params: {
        fields: [
          "id,displayName,programTrackedEntityAttributes[mandatory,trackedEntityAttribute[id,displayName,valueType,unique,generated,optionSetValue,optionSet[id,displayName,options[id,displayName,code]]]],programStages[id,displayName,programStageDataElements[compulsory,dataElement[id,displayName,valueType,optionSetValue,optionSet[id,displayName,options[id,displayName,code]]]]",
        ],
      },
    },
};

const dataStoreValuesQuery : any = {
  values : {
    resource: `dataStore/${DATA_STORE_NAME}/${DATA_STORE_VALUE_KEY}`
  }
} 
const reserveValuesQuery : any = {
  values : {
    resource: "trackedEntityAttributes",
    id: ({ numberOfReserve, attributeID }: { numberOfReserve: number, attributeID: string }) => `${attributeID}/generateAndReserve?numberToReserve=${numberOfReserve}`,
  }
} 



export default function useExportTemplate ( ) {
    const [searchParams , _] = useSearchParams()
    const { hide , show} = useShowAlerts()
    const { refetch: loadOneProgram} = useDataQuery(oneProgramQuery, { lazy: true });
    //const { refetch: loadDataStoreValues} = useDataQuery(dataStoreValuesQuery , {lazy: true })
    const { refetch: loadReserveValues} = useDataQuery(reserveValuesQuery , {lazy: true })
    const { getDataStoreData: programConfigDataStore } = getSelectedKey();

   async function generateInformations (inputValues: useExportTemplateProps){
      const sectionType : string | null = searchParams.get('sectionType')

      if(!sectionType)
        throw new Error("Couldn't find section type in url params")

      //const dataStoreValues: any = await loadDataStoreValues()
      //const programConfigDataStore: any = dataStoreValues?.values?.find((d: any) => d.key === sectionType) 
      
      if(!programConfigDataStore?.program)
        throw Error("Couldn't get program uid from datastore << values >>")

      const { program : programId , registration } : any = programConfigDataStore
      const correspondingProgram : any = await loadOneProgram({ programId})

      if(!correspondingProgram?.program)
        throw Error(`Couldn't find program << ${programId} >> in DHIS2`)

      if(!registration)
          throw Error(`Couldn't find registration config in datastore`)

      if(!programConfigDataStore?.["socio-economics"])
        throw Error(`Couldn't find socio-economics config in datastore`)

        const currentAttributes =  correspondingProgram?.program?.programTrackedEntityAttributes?.map(
            (p: { mandatory: boolean, trackedEntityAttribute: any}) => { return { mandatory: p.mandatory, ...p.trackedEntityAttribute } }
          ) || [];

        let newHeaders : any = [];
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
            metadataType: VariablesTypes.Attribute
          }));
        }
        

        let reserveValuePayload: any = {}

        for(let attr of newHeaders){
            if(attr.unique  && attr.generated){
              const reserveValueResponse: any  = await loadReserveValues({ numberOfReserve : +inputValues.studentsNumber , attributeID: attr.id})
              if(reserveValueResponse?.values?.length > 0 ){
                reserveValuePayload[`${attr.id}`] = reserveValueResponse.values
              }
            }
        }

        const registrationProgramStageDataElements = correspondingProgram?.program?.programStages?.reduce((prev: any, curr: any) => {
            if (curr.id === registration.programStage) {
              const newDataElements =
                curr.programStageDataElements?.reduce((dxPrev:any, dxCurr: any) => {
                  dxPrev.push({
                    key: `${registration.programStage}.${dxCurr.dataElement?.id}`,
                    id: `${registration?.programStage}.${dxCurr.dataElement?.id}`,
                    label: dxCurr.dataElement?.displayName,
                    valueType: dxCurr.dataElement?.valueType,
                    optionSetValue: dxCurr.dataElement?.optionSetValue || false,
                    options: dxCurr.dataElement?.optionSet?.options || [],
                    optionSetId: dxCurr.dataElement?.optionSet?.id || null,
                    required: dxCurr?.compulsory || false,
                    metadataType: VariablesTypes.DataElement
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
                curr.programStageDataElements?.reduce((dxPrev:any, dxCurr: any) => {
                  dxPrev.push({
                    key: `${programConfigDataStore?.["socio-economics"]?.programStage}.${dxCurr.dataElement?.id}`,
                    id: `${programConfigDataStore?.["socio-economics"]?.programStage}.${dxCurr.dataElement?.id}`,
                    label: dxCurr.dataElement?.displayName,
                    valueType: dxCurr.dataElement?.valueType,
                    optionSetValue: dxCurr.dataElement?.optionSetValue || false,
                    options: dxCurr.dataElement?.optionSet?.options || [],
                    optionSetId: dxCurr.dataElement?.optionSet?.id || null,
                    required: dxCurr?.compulsory || false,
                    metadataType: VariablesTypes.DataElement
                  });
                  return dxPrev;
                }, []) || [];
    
              prev = [...prev, ...newDataElements];
              return prev;
            }
    
            return prev;
          }, []) || [];

        const newBeginHeaders = [
         {key: `ref`,id: `ref`,label:'Ref',  valueType: 'TEXT', optionSetValue: false, options: [], optionSetId: null, required: false, metadataType: VariablesTypes.Default },
         {key: `orgUnitName`,id: `orgUnitName`,label:'School Name',  valueType: 'TEXT', optionSetValue: false, options: [], optionSetId: null, required: true, metadataType: VariablesTypes.Default  },
         {key: `orgUnit`,id: `orgUnit`,label:'School UID', valueType: 'TEXT', optionSetValue: false, options: [], optionSetId: null, required: true, metadataType: VariablesTypes.Default  },
         {key: `enrollmentDate`,id: `enrollmentDate`,label:'Enrollment date', valueType: 'DATE', optionSetValue: false, options: [], optionSetId: null, required: true, metadataType: VariablesTypes.Default },
        ]
    
        newHeaders = [...newBeginHeaders, ...registrationProgramStageDataElements, ...newHeaders , ...socioEconomicProgramStageDataElements];
    
        if (+inputValues.studentsNumber > 0) {
          for (let i = 0; i < +inputValues.studentsNumber; i++) {
            const payload: any = {};
            let incrementHeader = 0
            for (let newHeader of newHeaders) {
              let value = ''
              if(incrementHeader === 0)  value = `${i+1}`
              if(incrementHeader === 1) value =`${inputValues.orgUnitName}`
              if(incrementHeader === 2) value =`${inputValues.orgUnit}`
              if(incrementHeader === 3) value =`${format(new Date(), "yyyy-MM-dd")}`

              if(incrementHeader >3){
                const found_reserv = reserveValuePayload[newHeader.id]
                if(found_reserv){
                  value = found_reserv[0].value
                  reserveValuePayload[newHeader.id] = reserveValuePayload[newHeader.id].filter((resVam: { value: any }) => value !==resVam.value )
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
    
        return  { headers: newHeaders || []  , datas : newDataList || [] , currentProgram: correspondingProgram}
      };
    

   
    async function handleExportToWord(values: useExportTemplateProps) {
        try {

          values.setLoadingExport && values.setLoadingExport(true)
          
            const workbook = new window.ExcelJS.Workbook();
            const dataSheet = workbook.addWorksheet("Data");
            const metaDataSheet = workbook.addWorksheet("Metadata");
            const validationSheet = workbook.addWorksheet("Validation", { state: 'veryHidden' });

            const { headers , datas , currentProgram }  = await generateInformations(values)

          // Generating validation data
          validationSheetConstructor(validationSheet, headers)
            
            // generation des données du metadatas
            metaDataSheet.columns = [
                {
                    header: "programId",
                    key: "programId",
                    width: 20,
                },

                {
                    header: "programName",
                    key: "programName",
                    width: 20,
                },
                {
                    header: "",
                    key: "none",
                    width: 20,
                },
                {
                    header: "id",
                    key: "id",
                    width: 20,
                },
                {
                    header: "name",
                    key: "name",
                    width: 30,
                },

                {
                    header: "valueType",
                    key: "valueType",
                    width: 30,
                },

                {
                    header: "options",
                    key: "options",
                    width: 50,
                },
            ];

            for (let i = 0; i < headers.length; i++) {
                metaDataSheet.addRow({
                    id: headers[i].id,
                    name: headers[i].label,
                    valueType: headers[i].valueType,
                    options: headers[i].optionSetValue
                        ? headers[i].options?.map((op: { code: string, displayName: string }) => op.code || op.displayName)?.join(",")
                        : "",
                    programId: i === 0 ? currentProgram?.program?.id : "",
                    programName:
                        i === 0 ? currentProgram?.program?.displayName : "",
                    none: "",
                });
            }

            // Ajout des headers de la data
            dataSheet.columns = headers.map((header: any,index: number) => ({
                header: `${header.label} ${header.required ? "*" : ""}`,
                key: `${header.id}`,
                width: index === 0 ? 20 : 30,
                style: {
                    font: { bold: true },
                },
            }));

            // Add background in the first dataSheet row
            const firstRow = dataSheet.getRow(1);
            headers.forEach((header: any, index: any) => {
              const cell = firstRow.getCell(index+1);
              console.log("MetadataType", header.metadataType)
              cell.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: getHeaderBgColor(header.metadataType) },
              };
              cell.border = {
                top: { style: 'thin', color: { argb: 'D4D4D4' } },
                left: { style: 'thin', color: { argb: 'D4D4D4' } },
                bottom: { style: 'thin', color: { argb: 'D4D4D4' } },
                right: { style: 'thin', color: { argb: 'D4D4D4' } },
            };
              cell.font = { bold: true };
          });
            

            // Ajout du deuxieme headers
            const headerRow = dataSheet.addRow(headers.reduce((prev: any, curr: any) => {
              prev[curr.id] = curr.id;
              return prev;
            }, {}));
  
            // Add background in the header row
          headers.forEach((header: any, index: any) => {
            const cell = headerRow.getCell(index+1);
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: getHeaderBgColor(header.metadataType) },
            };
            cell.border = {
              top: { style: 'thin', color: { argb: 'D4D4D4' } },
              left: { style: 'thin', color: { argb: 'D4D4D4' } },
              bottom: { style: 'thin', color: { argb: 'D4D4D4' } },
              right: { style: 'thin', color: { argb: 'D4D4D4' } },
            };
            cell.font = { bold: true };
          });

            // Ajout des rows maintenants
            for (let data of datas) {
                dataSheet.addRow(
                    headers.reduce((prev: any, curr: any) => {
                        prev[curr.id] = data[curr.id]?.value;
                        // prev[curr.id] = "";
                        return prev;
                    }, {})
                );
            }

            for (let i = 0; i < datas.length; i++) {
                const currentRow = dataSheet.getRow(i + 3);
                if (currentRow) {
                    for (let j = 0; j < headers.length; j++) {
                        const currentCell = currentRow.getCell(j + 1);

                        if (currentCell && headers[j]?.optionSetValue) {
                          // Get the column letter from the number
                          const columnLetter = convertNumberToLetter(validationSheet.getColumn(headers[j].optionSetId).number);

                          // Formula composition for dataValidation
                          const formula = `'${validationSheet.name}'!$${columnLetter}$2:$${columnLetter}$${headers[j].options.length+1}`;

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

            workbook.xlsx.writeBuffer().then((buffer: any) => {
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                window.saveAs(blob, `${capitalizeString(searchParams.get("sectionType") ?? "" )} Data Import - Template.xlsx`);
            });

            show({
              message: "File exported successfully",
              type: { success: true },
          });
          setTimeout(hide, 5000);
            values.setLoadingExport && values.setLoadingExport(false) 
            
        } catch (err: any) {
          console.log(err)
          show({
            message: err.message,
            type: { critical: true},
          });
          setTimeout(hide, 5000);
          values.setLoadingExport && values.setLoadingExport(false)
        }
    }

    return {
        handleExportToWord
    }
}
