import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {EventsApi} from "../../../api/eventsApi";


const inviteUsers = declareAsyncAction<Array<string>, void>(
    'inviteUsers.inviteUsers',
    (userIds, store) => {
        return EventsApi.inviteUsers(Array.from(userIds))
    }
)

export {
    inviteUsers,
}