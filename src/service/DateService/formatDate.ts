export const formatDate = (date: string) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Split the input date into day, month, and year
    const [day, month, year  ] = date.split("/");
  
    // Convert the month from a number to a name
    const monthName = monthNames[parseInt(month, 10) - 1];
  
    // Return the formatted date
    return `${year}-${monthName}-${day}`;

}