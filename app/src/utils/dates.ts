import { DateRange } from "../types";

const formatDateToDDMMYYYY = (date:Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


function isDateBetween({dateToCheck, from, to}: DateRange & {dateToCheck: Date}) {
    const d1 = new Date(dateToCheck);
    const d2 = new Date(from);
    const d3 = new Date(to);
  
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    d3.setHours(0, 0, 0, 0);
  
    return d1 >= d2 && d1 <= d3;
  } 

export { formatDateToDDMMYYYY, isDateBetween }