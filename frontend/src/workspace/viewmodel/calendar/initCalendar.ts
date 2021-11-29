import {calendarActions, CalendarEvent} from "./calendar";
import {EventsApi} from "../../../api/eventsApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {notesActions} from "../notes/notes";


const initCalendar = declareAsyncAction<void, Array<CalendarEvent>>(
    'initCalendar',
    (_, store) => {
        store.dispatch(notesActions.setSelectedNote(null))
        return EventsApi.getCurrentUserEvents()
            .then(apiEvents => {
                const events: Array<CalendarEvent> = apiEvents
                    .map(event => ({
                        eventId: event.eventId,
                        place: event.place,
                        start: new Date(event.startDate * 1000),
                        end: new Date(event.endDate * 1000),
                        title: event.title,
                        organizerId: event.organizerId,
                        description: event.description,
                        invitedUsersIds: event.invitedUsersIds || [],
                        isRepeatable: false,
                        repeatable: 'none',
                    }))
                store.dispatch(calendarActions.updateEvents(events))
                return Promise.resolve(events)
            })
            .catch(() => {
                processStandardError()
                return Promise.reject()
            })
    }
)

export {
    initCalendar,
}