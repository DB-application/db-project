import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {Router} from "../../../core/router/router";
import {declareMapAtom} from "../../../core/reatom/declareMapAtom";

type Note = {
    noteId: string,
    title: string,
}

const clearNotes = declareAction('notes.clearNotes')

const {
    atom: notesAtom,
    removeItems: removeNotes,
    updateItem: updateNote,
    updateItems: updateNotes,
} = declareMapAtom<Note>(
    'sidebar.notes',
    (note => note.noteId),
    on => [
        on(clearNotes, () => ({})),
    ]
)

const orderedNotesAtom = map(
    notesAtom,
    notes => {
        return Object.values(notes).sort((noteA, noteB) => (
            noteA.title > noteB.title ? 1 : -1
        ))
    },
)

const setSelectedNote = declareAction<string|null>('setSelectedNote',
    (noteId, store) => {
        if (noteId) {
            Router.Note.open(noteId)
        }
    }
)

const selectedNoteAtom = declareAtom<string|null>('selectedNote', null, on => [
    on(setSelectedNote, (_, noteId) => noteId),
])

const sidebarNotesAtom = combine({
    notes: notesAtom,
    orderedNotes: orderedNotesAtom,
    selectedNote: selectedNoteAtom,
})

const notesActions = {
    updateNote,
    removeNotes,
    updateNotes,
    clearNotes,
    setSelectedNote,
}

export type {
    Note,
}

export {
    notesAtom,
    sidebarNotesAtom,
    orderedNotesAtom,
    selectedNoteAtom,
    notesActions,
}