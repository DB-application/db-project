import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {workspacesActions} from "./workspace";
import {openWorkspace} from "./loadWorkspace";
import {LocalStorage, STORAGE_KEYS} from "../../../core/localStorage/localStorage";
import {WorkspaceApi} from "../../../api/workspaceApi";

const initWorkspaces = declareAsyncAction<void, void>(
    'initWorkspaces',
    (_, store) => {
        return WorkspaceApi.getWorkspacesList()
            .then(workspacesList => {
                store.dispatch(workspacesActions.updateWorkspaces(workspacesList))
                const lastWorkspaceId = LocalStorage.getValue<string>(STORAGE_KEYS.WORKSPACE_ID)
                if (lastWorkspaceId && workspacesList.find(workspace => workspace.id === lastWorkspaceId)) {
                    store.dispatch(openWorkspace(lastWorkspaceId))
                }
                else {
                    store.dispatch(openWorkspace(workspacesList[0].id))
                }
                return Promise.resolve()
            })
    }
)

export {
    initWorkspaces,
}