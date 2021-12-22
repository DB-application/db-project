import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {WorkspaceApi} from "../../../api/workspaceApi";
import {workspacesActions} from "./workspace";
import {openWorkspace} from "./loadWorkspace";


const createWorkspace = declareAsyncAction<string, void>(
    'createWorkspace',
    (name, store) => {
        return WorkspaceApi.createWorkspace()
            .then(({id}) => {
                store.dispatch(workspacesActions.addWorkspace({
                    id,
                    name,
                }))
                store.dispatch(openWorkspace(id))
            })
    }
)

export {
    createWorkspace,
}