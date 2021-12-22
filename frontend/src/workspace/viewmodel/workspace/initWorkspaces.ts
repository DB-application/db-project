import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {setWorkspacesList} from "./workspace";
import {openWorkspace} from "./loadWorkspace";
import {LocalStorage, STORAGE_KEYS} from "../../../core/localStorage/localStorage";
import {WorkspaceApi} from "../../../api/workspaceApi";

const initWorkspaces = declareAsyncAction<void, void>(
    'initWorkspaces',
    (_, store) => {
        return WorkspaceApi.getWorkspacesList()
            .then(workspacesList => {
                store.dispatch(setWorkspacesList(workspacesList))
                const lastWorkspaceId = LocalStorage.getValue<string>(STORAGE_KEYS.WORKSPACE_ID)
                if (lastWorkspaceId) {
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