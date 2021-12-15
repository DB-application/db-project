import {combine, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {getNoteContent} from "./getNoteContent";
import {JSONContent} from '@tiptap/react'
import {editNoteTitle} from "./editNoteTitle";
import {notesActions, sidebarNotesAtom} from "./notes";
import {verify} from "../../../core/verify";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";

const setNoteTitle = declareAsyncAction<string, string>(
    'setNoteTitle',
    (title, store) => {
        const noteId = verify(store.getState(sidebarNotesAtom).selectedNote)
        return dispatchAsyncAction(store, editNoteTitle, {noteId, title})
            .then(() => {
                store.dispatch(notesActions.updateNote({
                    noteId,
                    title
                }))
                return Promise.resolve(title)
            })
    }
)


const [noteContentAtom, setNoteContent] = declareAtomWithSetter<JSONContent>('noteContent', {} as JSONContent, on => [
    on(getNoteContent.done, (_, {content}) => content)
])

const noteTitleAtom = declareAtom<string>('noteTitle', '', on => [
    on(getNoteContent.done, (_, {title}) => title),
    on(setNoteTitle.done, (_, title) => title),
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

