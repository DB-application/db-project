import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {initCalendar} from "./initCalendar";


type CalendarEvent  = {
    eventId: string,
    title: string;
    description: string,
    start: Date;
    end: Date;
    organizerId: string;
    invitedUsersIds: Array<string>;
}

type CalendarEvents = {
    [item: string]: CalendarEvent,
}

const removeEvent = declareAction<string>()
const updateEvent = declareAction<CalendarEvent>()
const initEvents = declareAction<Array<CalendarEvent>>()

const eventsAtom = declareAtom<CalendarEvents>('calendar.events', {}, on => [
    on(initEvents, (state, events) => {
        const eventsMap: CalendarEvents = {}
        events.forEach(event => eventsMap[event.eventId] = event)
        return eventsMap
    }),
    on(updateEvent, (state, event) => ({
        ...state,
        [event.eventId]: event,
    })),
    on(removeEvent, (state, eventId) => {
        const newEvents = {
            ...state,
        }
        delete newEvents[eventId]
        return newEvents
    }),
])

const [calendarLoadingAtom, setCalendarLoading] = declareAtomWithSetter<boolean>('calendar.calendarLoading', true, on => [
    on(initCalendar, () => true),
    on(initCalendar.done, () => false),
])

const calendarAtom = combine({
    events: eventsAtom,
    calendarLoading: calendarLoadingAtom,
})

const calendarActions = {
    updateEvent,
    removeEvent,
    initEvents,
    setCalendarLoading,
}

export type {
    CalendarEvent,
    CalendarEvents,
}
export {
    calendarAtom,
    calendarActions,
}