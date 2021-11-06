import {EventsApi} from "../../../api/eventsApi";
import {calendarActions} from "./calendar";
import {processStandardError} from "../../../core/error/processStandardError";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {toast} from "react-toastify";
import {I18n_get} from "../../../i18n/i18n_get";


const removeEventAction = declareAsyncAction<string, void>(
    'removeEvent',
    (eventId, store) => {

        return EventsApi.removeEvent(eventId)
            .then(() => {
                store.dispatch(calendarActions.removeEvent([eventId]))
                toast.success(I18n_get('Success.EventRemoved'))
                return Promise.resolve()
            })
            .catch(() => {
                processStandardError()
                return Promise.reject()
            })
    }
)

export {
    removeEventAction,
}