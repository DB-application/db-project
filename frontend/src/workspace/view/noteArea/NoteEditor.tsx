import {EditorContent, useEditor} from '@tiptap/react'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import Image from '@tiptap/extension-image'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import lowlight from 'lowlight'
import styles from './NoteEditor.module.css'
import './Editor.css'
import {useAction, useAtom} from "@reatom/react";
import {noteActions, noteAtom} from "../../viewmodel/notes/note";
import {InlineToolbar} from './InlineToolbar/InlineToolbar'
import {AddBlockPopover} from "./AddBlockToolbar/AddBlockPopover";
import 'tippy.js/animations/shift-away.css';
import {TitleEditor} from "./TitleEditor/TitleEditor"


function NoteEditor() {
    const note = useAtom(noteAtom)
    const handleSetNoteContent = useAction(noteActions.setNoteContent)
    const handleSetNoteTitle = useAction(noteActions.setNoteTitle)
    const editor = useEditor({
        extensions: [
            StarterKit,
            TaskList,
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: styles.taskListItem
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: true,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Table.configure({
                resizable: true,
            }),
            Image,
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: note.content,
        onUpdate: ({ editor }) => handleSetNoteContent(editor.getHTML()),
    })

    return (
        <div className={styles.noteContainerWrapper}>
            <TitleEditor
                value={note.title}
                onBlur={title => note.title !== title && handleSetNoteTitle(title)}
                className={styles.title}
            />
            <div className={styles.noteContainer}>
                <EditorContent editor={editor} />
                {editor && <InlineToolbar editor={editor} />}
                {editor && <AddBlockPopover editor={editor} />}
            </div>
        </div>
    )
}

export {
    NoteEditor,
}