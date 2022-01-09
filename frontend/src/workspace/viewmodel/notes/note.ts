import {combine, declareAction, declareAtom} from "@reatom/core";
import {getNoteContent} from "./getNoteContent";
import {editNoteTitle} from "./editNoteTitle";
import {sidebarNotesAtom} from "./notes";
import {verify} from "../../../core/verify";
import {editNoteContent} from "./editNoteContent";

const setNoteTitle = declareAction<string>(
    'setNoteTitle',
    (title, store) => {
        const noteId = verify(store.getState(sidebarNotesAtom).selectedNote)
        store.dispatch(editNoteTitle({noteId, title}))
    }
)

const setNoteContent = declareAction<string>(
    'setNoteContent',
    (content, store) => {
        const noteId = verify(store.getState(sidebarNotesAtom).selectedNote)
        store.dispatch(editNoteContent({content, noteId}))
    }
)


const noteContentAtom = declareAtom<string>('noteContent', '', on => [
    on(getNoteContent.done, (_, {content}) => content),
    on(setNoteContent, (_, content) => content),
])

const noteTitleAtom = declareAtom<string>('noteTitle', '', on => [
    on(getNoteContent.done, (_, {title}) => title),
    on(setNoteTitle, (_, title) => title),
])

const selectedNoteLoadingAtom = declareAtom<boolean>('selectedNoteLoading', true, on => [
    on(getNoteContent, () => true),
    on(getNoteContent.done, () => false),
])


const noteAtom = combine({
    content: noteContentAtom,
    title: noteTitleAtom,
    isLoading: selectedNoteLoadingAtom,
})

const noteActions = {
    setNoteContent,
    setNoteTitle,
}

export {
    noteAtom,
    noteActions,
}

