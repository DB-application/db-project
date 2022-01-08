import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {WorkspaceApi} from "../../../api/workspaceApi";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {loadAbsentUsers} from "../../../users/loadUsers";
import {workspacesAtom} from "./workspace";


const loadInvitedUsers = declareAsyncAction<string, Array<string>>('loadInvitedUsers',
    (workspaceId, store) => {
        return WorkspaceApi.getInvitedUsers(workspaceId)
            .then(async (users) => {
                const workspaces = store.getState(workspacesAtom)
                const ownerId = workspaces[workspaceId].ownerId
                await dispatchAsyncAction(store, loadAbsentUsers, [...users, ownerId])
                return Promise.resolve(users)
            })
    }
)

export {
    loadInvitedUsers,
}