import { VariablesTypes } from "../../types/variables/AttributeColumns";

export const getHeaderBgColor = (metadataType: string) => {
    switch (metadataType) {
      case VariablesTypes.Default:
        return "FCE5CD";

      case VariablesTypes.Attribute:
        return "D9EAD3";

      case VariablesTypes.DataElement:
        return "FFF2CC";
    
      default:
        return "FFFFFF";
    }
  }