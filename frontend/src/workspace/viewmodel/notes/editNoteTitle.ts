import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {NotesApi} from "../../../api/noteApi";

type EditNoteTitlePayload = {
    noteId: string,
    title: string,
}

const editNoteTitle = declareAsyncAction<EditNoteTitlePayload, void>(
    'editNoteTitle',
    ({noteId, title}, store) => {
        return NotesApi.editNoteTitle({noteId, title})
    }
)

export {
    editNoteTitle,
}