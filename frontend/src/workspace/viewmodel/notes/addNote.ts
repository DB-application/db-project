import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {NotesApi} from "../../../api/noteApi";
import {authorizedUser} from "../../../authentication/viewModel/userAtom";
import {notesActions} from "./notes";
import {Router} from "../../../core/router/router";
import { toast } from "react-toastify";
import {I18n_get} from "../../../i18n/i18n_get";


const addNote = declareAsyncAction<void, void>(
    'addNote',
    (_, store) => {
        const currentUserId = store.getState(authorizedUser).id

        const noteTitle = 'Новая заметка'

        return NotesApi.createNote({
            title: noteTitle,
            createdBy: currentUserId
        })
            .then(({noteId}) => {
                store.dispatch(notesActions.updateNote({
                    noteId,
                    title: noteTitle,
                }))
                store.dispatch(notesActions.setSelectedNote(noteId))
                Router.Note.open(noteId)
                return Promise.resolve()
            })
            .catch(() => {
                toast.error(I18n_get('Errors.AddNote'))
                return Promise.reject()
            })
    }
)

export {
    addNote,
}