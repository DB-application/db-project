import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {NoteContent, NotesApi} from "../../../api/noteApi";
import {Router} from "../../../core/router/router";


const getNoteContent = declareAsyncAction<string, NoteContent>(
    'getNoteContent',
    (noteId, store) => {

        return NotesApi.getNoteContent(noteId)
            .then(data => {
                return Promise.resolve(data)
            })
            .catch(() => {
                Router.Workspace.open()
                return Promise.reject()
            })
    }
)

export {
    getNoteContent,
}