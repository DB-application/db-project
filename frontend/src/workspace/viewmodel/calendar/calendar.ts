import {UserType} from "../../../user/UserType";
import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";


type CalendarEvent  = {
    eventId: string,
    title: string;
    start: Date;
    end: Date;
    invitedUsers: Array<UserType>;
}

type CalendarEvents = {
    [item: string]: CalendarEvent,
}

const removeEvent = declareAction<string>()
const updateEvent = declareAction<CalendarEvent>()

const eventsAtom = declareAtom<CalendarEvents>('calendar.events', {}, on => [
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

const [calendarLoadingAtom, setCalendarLoading] = declareAtomWithSetter<boolean>('calendar.calendarLoading', false)

const calendarAtom = combine({
    events: eventsAtom,
    calendarLoading: calendarLoadingAtom,
})

const calendarActions = {
    updateEvent,
    removeEvent,
    setCalendarLoading,
}

export {
    calendarAtom,
    calendarActions,
}