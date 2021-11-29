import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {initCalendar} from "./initCalendar";
import {declareMapAtom} from "../../../core/reatom/declareMapAtom";

type CalendarEventRepeatableType = 'none' | 'everyWeek' | 'everyDay' | 'everyMonth'

type CalendarEvent  = {
    eventId: string,
    title: string;
    description: string,
    start: Date;
    end: Date;
    organizerId: string;
    place: string;
    invitedUsersIds: Array<string>;
    repeatable: CalendarEventRepeatableType;
    isRepeatable: boolean;
}

const {
    atom: eventsAtom,
    removeItems: removeEvent,
    updateItem: updateEvent,
    updateItems: updateEvents,
} = declareMapAtom<CalendarEvent>(
    'calendar.events',
    (event => event.eventId),
)

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
    updateEvents,
    setCalendarLoading,
}

export type {
    CalendarEvent,
    CalendarEventRepeatableType,
}
export {
    calendarAtom,
    calendarActions,
}