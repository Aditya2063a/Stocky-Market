export const convertDateToUnix  = (date) => {
    return Math.floor(date.getTime() / 1000);
};

export const convertUnixtoDate = (unix) => {
    const millisec = unix *1000;
    return new Date(millisec).toLocaleDateString();
};

export const createDate = (date,days,weeks,months,years) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setDate(newDate.getMonth() + months);
    newDate.setDate(newDate.getFullYear() + years);
    return newDate;
}