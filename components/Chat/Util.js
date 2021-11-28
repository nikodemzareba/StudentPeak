export function pad(dateStamp){
    return `0${dateStamp}`.slice(-2);
}

export function getTimeFromDate(time){
    const date = new Date(time);

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
