import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {WorkspaceApi} from "../../../api/workspaceApi";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {loadAbsentUsers} from "../../../users/loadUsers";


const loadInvitedUsers = declareAsyncAction<string, Array<string>>('loadInvitedUsers',
    (workspaceId, store) => {
        return WorkspaceApi.getInvitedUsers(workspaceId)
            .then(async (users) => {
                await dispatchAsyncAction(store, loadAbsentUsers, users)
                return Promise.resolve(users)
            })
    }
)

export {
    loadInvitedUsers,
}