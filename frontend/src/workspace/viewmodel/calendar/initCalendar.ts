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
            .then(events => {
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