import {CreateEventData, EventsApi} from "../../../api/eventsApi";
import {calendarActions} from "./calendar";
import {processStandardError} from "../../../core/error/processStandardError";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {toast} from "react-toastify";
import {I18n_get} from "../../../i18n/i18n_get";

const createEventAction = declareAsyncAction<CreateEventData, void>(
    'createEvent',
    (payload, store) => {

        return EventsApi.createEvent(payload)
            .then(({eventId}) => {
                store.dispatch(calendarActions.updateEvent({
                    eventId,
                    start: payload.start,
                    end: payload.end,
                    organizerId: payload.organizerId,
                    title: payload.title,
                    description: payload.description,
                    invitedUsersIds: payload.invitedUsersIds,
                    place: payload.place,
                    repeatable: payload.repeatable,
                    isRepeatable: payload.isRepeatable,
                }))
                toast.success(I18n_get('Success.EventCreate'))
                return Promise.resolve({eventId})
            })
            .catch(() => {
                processStandardError()
                return Promise.reject()
            })
    }
)

export {
    createEventAction,
}