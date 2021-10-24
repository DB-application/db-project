import {TimeType} from "./TimePicker";

function serializeNumber(num: number) {
    return num < 10
        ? `0${num}`
        : String(num)
}

function convertTimeToDate(currentDate: Date, time: TimeType) {
    const newDate = new Date(currentDate)
    newDate.setHours(time.hours)
    newDate.setMinutes(time.minutes)
    return newDate
}

function getDateString(date: Date) {
    return `${serializeNumber(date.getFullYear())}-${serializeNumber(date.getMonth())}-${serializeNumber(date.getDay())}`
}

function convertDateFromString(currentDate: Date, dateString: string) {
    const [year, month, day] = dateString.split('-').map(value => Number(value))
    const newDate = new Date(currentDate)
    newDate.setDate(day)
    newDate.setMonth(month)
    newDate.setFullYear(year)
    return newDate
}


export {
    convertTimeToDate,
    convertDateFromString,
    getDateString,
    serializeNumber,
}