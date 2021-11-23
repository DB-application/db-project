import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {EventsApi} from "../../../api/eventsApi";


const removeUserFromEventAction = declareAsyncAction<Array<string>, void>(
    'removeUserFromEventAction',
    (userIds, store) => {
        return EventsApi.removeUsersFromEvent(Array.from(userIds))
    }
)

export {
    removeUserFromEventAction,
}