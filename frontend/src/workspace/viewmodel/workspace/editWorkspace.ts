import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {EditWorkspacePayload, WorkspaceApi} from "../../../api/workspaceApi";
import {workspacesActions, workspacesAtom} from "./workspace";

const editWorkspace = declareAsyncAction<EditWorkspacePayload, void>(
    'createWorkspace',
    (payload, store) => {
        return WorkspaceApi.editWorkspace(payload)
            .then(() => {
                const workspaces = store.getState(workspacesAtom)
                store.dispatch(workspacesActions.updateWorkspace({
                    ...workspaces[payload.id],
                    id: payload.id,
                    name: payload.name,
                    invitedUsersIds: payload.invitedUsersIds,
                }))
            })
    }
)

export {
    editWorkspace
}