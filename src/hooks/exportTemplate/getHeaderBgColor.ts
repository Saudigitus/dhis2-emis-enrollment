import { VariablesTypes } from "../../types/variables/AttributeColumns";
import { SectionVariablesTypes } from "./useExportTemplate";

export const getHeaderBgColor = (metadataType: string) => {
    switch (metadataType) {
      case VariablesTypes.Default:
        case SectionVariablesTypes.EnrollmentDetails:
          return "FCE5CD";

      case VariablesTypes.Attribute:
        case SectionVariablesTypes.Profile:
        return "D9EAD3";

      case VariablesTypes.DataElement:
        case SectionVariablesTypes.SocioEconomics:
        return "FFF2CC";
    
      default:
        return "FFFFFF";
    }
  }