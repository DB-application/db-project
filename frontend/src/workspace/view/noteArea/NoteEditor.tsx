import {EditorContent, useEditor} from '@tiptap/react'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
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


function NoteEditor() {
    const note = useAtom(noteAtom)
    const handleSetNoteContent = useAction(noteActions.setNoteContent)
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
                openOnClick: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: note.content,
        onUpdate: ({ editor }) => {
            handleSetNoteContent(editor.getJSON().content)
        },
    })

    return (
        <>
            <div className={styles.title}>{note.title}</div>
            <div className={styles.noteContainer}>
                {editor && <InlineToolbar editor={editor} />}
                {editor && <AddBlockPopover editor={editor} />}
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

export {
    NoteEditor,
}