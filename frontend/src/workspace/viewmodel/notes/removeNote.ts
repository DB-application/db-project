import {declareAction} from "@reatom/core";
import {Router} from "../../../core/router/router";
import {notesActions, orderedNotesAtom, selectedNoteAtom} from "./notes";
import {NotesApi} from "../../../api/noteApi";
import {processStandardError} from "../../../core/error/processStandardError";


const removeNote = declareAction<string>(
    (noteId, store) => {
        NotesApi.removeNote(noteId)
            .then(() => {
                store.dispatch(notesActions.removeNotes([noteId]))
                const selectedNote = store.getState(selectedNoteAtom)
                if (noteId === selectedNote) {
                    const notes = store.getState(orderedNotesAtom)
                    const notesCount = notes.length
                    if (notesCount > 0) {
                        store.dispatch(notesActions.setSelectedNote(notes[0].noteId))
                        return
                    }
                    store.dispatch(notesActions.setSelectedNote(null))
                    Router.Workspace.open()
                }
            })
            .catch(processStandardError)
    }
)

export {
    removeNote,
}