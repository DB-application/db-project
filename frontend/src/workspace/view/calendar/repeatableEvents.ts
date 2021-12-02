import {CalendarEvent, CalendarEventRepeatableType} from "../../viewmodel/calendar/calendar";

const DAYS_IN_YEAR = 365
const MONTHS_IN_YEAR = 12
const WEEKS_IN_YEAR = 53

function setNextDay(date: Date) {
    date.setDate(date.getDate() + 1)
}
function setNextWeek(date: Date) {
    date.setDate(date.getDate() + 7)
}
function setNextMonth(date: Date) {
    date.setMonth(date.getMonth() + 1)
}

function increaseDates(dateStart: Date, dateEnd: Date, repeatable: CalendarEventRepeatableType) {
    switch (repeatable) {
        case "everyDay":
            setNextDay(dateStart)
            setNextDay(dateEnd)
            break
        case "everyWeek":
            setNextWeek(dateStart)
            setNextWeek(dateEnd)
            break
        case "everyMonth":
            setNextMonth(dateStart)
            setNextMonth(dateEnd)
            break
    }
}

function calculateIterationsCount(repeatable: CalendarEventRepeatableType) {
    switch (repeatable) {
        case "everyDay":
            return DAYS_IN_YEAR
        case "everyMonth":
            return MONTHS_IN_YEAR
        case "everyWeek":
            return WEEKS_IN_YEAR
    }
    throw new Error('unknown repeatable')
}

function getRepeatableEvents(event: CalendarEvent): Array<CalendarEvent> {
    const repeatable = event.repeatable
    const initialDateStart = new Date(event.start)
    const initialDateEnd = new Date(event.end)

    const newEvents: Array<CalendarEvent> = [event]
    increaseDates(initialDateStart, initialDateEnd, repeatable)

    const iterationCount = calculateIterationsCount(event.repeatable)

    for (let i = 0; i < iterationCount; i++) {
        const newEvent: CalendarEvent = {
            ...event,
            start: new Date(initialDateStart),
            end: new Date(initialDateEnd),
            isRepeatable: true,
        }
        newEvents.push(newEvent)
        increaseDates(initialDateStart, initialDateEnd, repeatable)
    }
    return newEvents
}

export {
    getRepeatableEvents,
}