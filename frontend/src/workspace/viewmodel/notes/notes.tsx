import {combine, declareAction, declareAtom, map} from "@reatom/core";
import {Router} from "../../../core/router/router";

type Note = {
    noteId: string,
    title: string,
}

type Notes = {
    [item: string]: Note,
}

const removeNote = declareAction<string>(
    (noteId, store) => {
        const selectedNote = store.getState(selectedNoteAtom)
        if (noteId === selectedNote) {
            const notes = store.getState(orderedNotesAtom)
            const notesCount = notes.length
            if (notesCount > 0) {
                store.dispatch(setSelectedNote(notes[0].noteId))
                return
            }
            store.dispatch(setSelectedNote(null))
            Router.Workspace.open()
        }
    }
)
const updateNote = declareAction<Note>()
const initNotes = declareAction<Array<Note>>()

const notesAtom = declareAtom<Notes>('notes', {}, on => [
    on(initNotes, (state, notes) => {
        const notesMap: Notes = {}
        notes.forEach(note => notesMap[note.noteId] = note)
        return notesMap
    }),
    on(updateNote, (state, note) => ({
        ...state,
        [note.noteId]: note,
    })),
    on(removeNote, (state, noteId) => {
        const newEvents = {
            ...state,
        }
        delete newEvents[noteId]
        return newEvents
    }),
])

const orderedNotesAtom = map(
    notesAtom,
    notes => {
        return Object.values(notes).sort((noteA, noteB) => (
            noteA.title > noteB.title ? 1 : -1
        ))
    },
)

const setSelectedNote = declareAction<string|null>('setSelectedNote',
    (nodeId, store) => {
        if (nodeId) {
            Router.Note.open(nodeId)
            return
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
    removeNote,
    initNotes,
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