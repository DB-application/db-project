import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {notesActions} from "./notes";
import {NotesApi} from "../../../api/noteApi";

type EditNoteTitlePayload = {
    noteId: string,
    title: string,
}

const editNoteTitle = declareAsyncAction<EditNoteTitlePayload, string>(
    'editNoteTitle',
    ({noteId, title}, store) => {
        return NotesApi.editNoteTitle({noteId, title})
            .then(() => {
                store.dispatch(notesActions.updateNote({
                    noteId,
                    title
                }))
                return Promise.resolve(title)
            })
    }
)

export {
    editNoteTitle,
}