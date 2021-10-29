import {calendarActions} from "./calendar";
import {EventsApi} from "../../../api/eventsApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";


const initCalendar = declareAsyncAction<void, void>(
    'initCalendar',
    (_, store) => {
        return EventsApi.getCurrentUserEvents()
            .then(events => {
                store.dispatch(calendarActions.initEvents(events))
                return Promise.resolve()
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