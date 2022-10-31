import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {WorkspaceApi} from "../../../api/workspaceApi";
import {currentWorkspaceAtom, workspaceListAtom, workspacesActions} from "./workspace";
import {openWorkspace} from "./loadWorkspace";


const deleteWorkspace = declareAsyncAction<string, void>(
    'deleteWorkspace',
    (id, store) => {
        return WorkspaceApi.deleteWorkspace(id)
            .then(() => {
                const currentWorkspace = store.getState(currentWorkspaceAtom)
                const workspaceList = store.getState(workspaceListAtom)
                const workspacesListWithoutRemoved = [...workspaceList].filter(workspace => workspace.id !== id)
                if (currentWorkspace === id) {
                    store.dispatch(openWorkspace(workspacesListWithoutRemoved[0].id))
                }
                store.dispatch(workspacesActions.removeWorkspace([id]))
            })
    }
)

export {
    deleteWorkspace,
}