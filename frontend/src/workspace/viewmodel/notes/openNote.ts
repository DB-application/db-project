import {declareAction} from "@reatom/core";
import {notesActions, notesAtom, selectedNoteAtom} from "./notes";
import {getNoteContent} from "./getNoteContent";
import {Router} from "../../../core/router/router";


const openNote = declareAction<string>(
    'openNote',
    (noteId, store) => {
        const notes = store.getState(notesAtom)
        const selectedNote = store.getState(selectedNoteAtom)
        if (notes[noteId]) {
            selectedNote !== noteId && store.dispatch(notesActions.setSelectedNote(noteId))
            store.dispatch(getNoteContent(noteId))
        }
        else {
            Router.Workspace.open()
        }
    }
)

export {
    openNote,
}