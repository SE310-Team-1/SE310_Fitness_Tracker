function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    // Determine the suffix
    let suffix;
    if (day >= 4 && day <= 20) suffix = 'th';
    else switch (day % 10) {
        case 1: suffix = 'st'; break;
        case 2: suffix = 'nd'; break;
        case 3: suffix = 'rd'; break;
        default: suffix = 'th'; break;
    }

    // Format the date
    return `${day}${suffix} ${month} ${year}`;
};

/* 
    DateToString() returns a formatted string in yyyy-mm-dd format corresponding with the
    date parameter. This format is complient with the HTML <input type="date"> element.

    params:
        date:   The JavaScript Date object which should be formatted.
*/
function dateToString(date) {
    let day = String(date.getDate()).padStart(2, "0");
    /* NOTE: Month indexes from 0, hence we add 1 to the month. */
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

export {formatDate, 
    dateToString};