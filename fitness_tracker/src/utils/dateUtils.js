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

export default formatDate;