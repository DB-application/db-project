import {combine, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {getNoteContent} from "./getNoteContent";
import {JSONContent} from '@tiptap/react'


const [noteContentAtom, setNoteContent] = declareAtomWithSetter<JSONContent>('noteContent', {} as JSONContent, on => [
    on(getNoteContent.done, (_, {content}) => content)
])

const [noteTitleAtom, setNoteTitleAtom] = declareAtomWithSetter<string>('noteTitle', '', on => [
    on(getNoteContent.done, (_, {title}) => title)
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
}

export {
    noteAtom,
    noteActions,
}
