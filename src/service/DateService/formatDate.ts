export const formatDate = (date: string | undefined ) => {

    if (!date) {
        // If the date is null or undefined, return an empty string or a default message
        return undefined; // or "Date not provided" if you want a default message
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Split the input date into day, month, and year
    const [day, month, year  ] = date.split("/");
  
    // Convert the month from a number to a name
    const monthName = monthNames[parseInt(month, 10) - 1];
  
    // Return the formatted date
    return `${year}-${monthName}-${day}`;

}