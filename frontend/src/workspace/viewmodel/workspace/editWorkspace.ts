import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {EditWorkspacePayload, WorkspaceApi} from "../../../api/workspaceApi";
import {workspacesActions, workspacesAtom} from "./workspace";

const editWorkspace = declareAsyncAction<EditWorkspacePayload, void>(
    'editWorkspace',
    (payload, store) => {
        return WorkspaceApi.editWorkspace(payload)
            .then(() => {
                const workspaces = store.getState(workspacesAtom)
                const currentWorkspace = workspaces[payload.id]
                store.dispatch(workspacesActions.updateWorkspace({
                    id: currentWorkspace.id,
                    name: payload.name,
                    ownerId: currentWorkspace.ownerId,
                }))
            })
    }
)

export {
    editWorkspace
}