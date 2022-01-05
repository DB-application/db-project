import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {WorkspaceApi} from "../../../api/workspaceApi";
import {workspacesActions} from "./workspace";
import {openWorkspace} from "./loadWorkspace";
import {authorizedCurrentUser} from "../../../authentication/viewModel/currentUserAtom";


const createWorkspace = declareAsyncAction<string, void>(
    'createWorkspace',
    (name, store) => {
        console.log('createWorksa')
        return WorkspaceApi.createWorkspace({
            name,
        })
            .then(({id}) => {
                const currentUserId = store.getState(authorizedCurrentUser).id
                store.dispatch(workspacesActions.updateWorkspace({
                    id,
                    name,
                    invitedUsersIds: [],
                    createdBy: currentUserId,
                }))
                store.dispatch(openWorkspace(id))
            })
    }
)

export {
    createWorkspace,
}