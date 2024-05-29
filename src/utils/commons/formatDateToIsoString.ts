import { format, parse } from "date-fns";

export function formatDateToIsoString(dateString: string) {
    const originalFormat = 'yyyy-MM-dd';
    const desiredFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";
   
    const datePart = parse(dateString, originalFormat, new Date()); // converts the date string to a Date object
   
    const now = new Date(); // get the current time
  
    datePart.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()); // // Adjust the selected date to include the current time
  
   
    const formattedDate = format(datePart, desiredFormat); // Format the date to the desired format
  
    return formattedDate;
  }
