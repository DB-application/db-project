import {BubbleMenu, Editor} from '@tiptap/react'
import {SwitchButton} from "./SwitchButton";
import {TypeBoldIcon} from "../../../../icons/TypeBoldIcon";
import {TypeItalicIcon} from "../../../../icons/TypeItalicIcon";
import {TypeStrikethroughIcon} from "../../../../icons/TypeStrikethroughIcon";
import {AlignLeftIcon} from "../../../../icons/AlignLeftIcon";
import {AlignCenterIcon} from "../../../../icons/AlignCenterIcon";
import {AlignRightIcon} from "../../../../icons/AlignRightIcon";
import {BxAlignJustifyIcon} from "../../../../icons/BxAlignJustifyIcon";
import styles from './InlineToolbar.module.css'
import {TypeUnderlineIcon} from "../../../../icons/TypeUnderlineIcon";
import {FormatClearIcon} from "../../../../icons/FormatClearIcon";
import {BxHighlightIcon} from "../../../../icons/BxHighlightIcon";
import {LinkIcon} from "../../../../icons/LinkIcon";

type InlineToolbarProps ={
    editor: Editor,
}

function Divider() {
    return (
        <div className={styles.divider}/>
    )
}

function InlineToolbar({
    editor,
}: InlineToolbarProps,) {
    const _setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
        if (url === null) {
            return
        }
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    return (
        <BubbleMenu
            editor={editor}
            tippyOptions={{
                duration: [200, 200],
                animation: 'shift-away',
            }}
        >
            <div className={styles.container}>
                <SwitchButton
                    checked={editor.isActive('bold')}
                    onCheckedChange={() => editor.chain().focus().toggleBold().run()}
                    icon={<TypeBoldIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive('italic')}
                    onCheckedChange={() => editor.chain().focus().toggleItalic().run()}
                    icon={<TypeItalicIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive('underline')}
                    onCheckedChange={() => editor.chain().focus().toggleUnderline().run()}
                    icon={<TypeUnderlineIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive('strike')}
                    onCheckedChange={() => editor.chain().focus().toggleStrike().run()}
                    icon={<TypeStrikethroughIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive('highlight')}
                    onCheckedChange={() => editor.chain().focus().toggleHighlight().run()}
                    icon={<BxHighlightIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive('link')}
                    onCheckedChange={() => _setLink()}
                    icon={<LinkIcon />}
                    className={styles.switcher}
                />
                <Divider/>
                <SwitchButton
                    checked={false}
                    onCheckedChange={() => editor.chain().focus().unsetAllMarks().run()}
                    icon={<FormatClearIcon />}
                    className={styles.switcher}
                />
                <Divider/>
                <SwitchButton
                    checked={editor.isActive({ textAlign: 'left' })}
                    onCheckedChange={() => editor.chain().focus().setTextAlign('left').run()}
                    icon={<AlignLeftIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive({ textAlign: 'center' })}
                    onCheckedChange={() => editor.chain().focus().setTextAlign('center').run()}
                    icon={<AlignCenterIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive({ textAlign: 'right' })}
                    onCheckedChange={() => editor.chain().focus().setTextAlign('right').run()}
                    icon={<AlignRightIcon />}
                    className={styles.switcher}
                />
                <SwitchButton
                    checked={editor.isActive({ textAlign: 'justify' })}
                    onCheckedChange={() => editor.chain().focus().setTextAlign('justify').run()}
                    icon={<BxAlignJustifyIcon />}
                    className={styles.switcher}
                />
            </div>
        </BubbleMenu>
    )
}

export {
    InlineToolbar,
}

export type {
    InlineToolbarProps,
}