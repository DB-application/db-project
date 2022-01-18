import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {initNotes} from "../notes/initNotes";
import {setCurrentWorkspace} from "./workspace";
import {LocalStorage, STORAGE_KEYS} from "../../../core/localStorage/localStorage";
import {Router} from "../../../core/router/router";

const openWorkspace = declareAsyncAction<string, void>(
    'openWorkspace',
    (workspaceId, store) => {
        return dispatchAsyncAction(store, initNotes, workspaceId)
            .then(() => {
                LocalStorage.setValue(STORAGE_KEYS.WORKSPACE_ID, workspaceId)
                store.dispatch(setCurrentWorkspace(workspaceId))
                return Promise.resolve()
            })
    }
)

export {
    openWorkspace,
}