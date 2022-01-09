import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {NotesApi} from "../../../api/noteApi";
import {authorizedCurrentUser} from "../../../authentication/viewModel/currentUserAtom";
import {notesActions} from "./notes";
import {Router} from "../../../core/router/router";
import { toast } from "react-toastify";
import {I18n_get} from "../../../i18n/i18n_get";
import {currentWorkspaceAtom} from "../workspace/workspace";
import {openNote} from "./openNote";


const addNote = declareAsyncAction<void, void>(
    'addNote',
    (_, store) => {
        const workspaceId = store.getState(currentWorkspaceAtom)
        const noteTitle = 'Новая заметка'

        return NotesApi.createNote({
            title: noteTitle,
            workspaceId,
        })
            .then(({noteId}) => {
                store.dispatch(notesActions.updateNote({
                    noteId,
                    title: noteTitle,
                }))
                store.dispatch(openNote(noteId))
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