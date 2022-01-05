import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {WorkspaceApi} from "../../../api/workspaceApi";
import {workspacesActions} from "./workspace";


const deleteWorkspace = declareAsyncAction<string, void>(
    'createWorkspace',
    (id, store) => {
        return WorkspaceApi.deleteWorkspace(id)
            .then(() => {
                store.dispatch(workspacesActions.removeWorkspace([id]))
            })
    }
)

export {
    deleteWorkspace,
}