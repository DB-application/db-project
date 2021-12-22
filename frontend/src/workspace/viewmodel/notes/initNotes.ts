import {notesActions} from "./notes";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {NotesApi} from "../../../api/noteApi";


const initNotes = declareAsyncAction<string, void>(
    'initNotes',
    (workspaceId, store) => {
        return NotesApi.getNotes(workspaceId)
            .then(notes => {
                store.dispatch(notesActions.clearNotes())
                store.dispatch(notesActions.updateNotes(notes))
                return Promise.resolve()
            })
    }
)

export {
    initNotes,
}